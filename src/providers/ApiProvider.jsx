import axios from 'axios';
import React, { useMemo } from 'react';

import ApiContext from '../contexts/api.js';
import routes from '../routes.js';

const socketWithAck = (fn) => (...args) => (
  new Promise((resolve, reject) => {
    // eslint-disable-next-line functional/no-let
    let state = 'pending';
    const timer = setTimeout(() => {
      state = 'rejected';
      reject();
    }, 3000);

    fn(...args, (response) => {
      if (state !== 'pending') return;
      clearTimeout(timer);
      if (response.status === 'ok') {
        state = 'resolved';
        resolve(response.data);
      }
      reject();
    });
  })
);

const ApiProvider = ({ children, socket }) => {
  const ax = axios.create();

  const login = async (data) => {
    const url = routes.apiLoginPath();
    const response = await axios.post(url, data);
    return response.data;
  };

  const signup = async (data) => {
    const url = routes.apiSignupPath();
    const response = await axios.post(url, data);
    return response.data;
  };

  const fetchInitialData = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    ax.defaults.headers.common.Authorization = `Bearer ${user.token}`;

    const url = routes.apiDataPath();
    const response = await ax.get(url);
    return response.data;
  };

  const api = useMemo(() => ({
    login,
    signup,
    fetchInitialData,
    createChannel: socketWithAck((...args) => socket.volatile.emit('newChannel', ...args)),
    renameChannel: socketWithAck((...args) => socket.volatile.emit('renameChannel', ...args)),
    removeChannel: socketWithAck((...args) => socket.volatile.emit('removeChannel', ...args)),
    sendMessage: socketWithAck((...args) => socket.volatile.emit('newMessage', ...args)),
  }), []);

  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
