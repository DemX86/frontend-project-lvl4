import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import { io } from 'socket.io-client';
import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App.jsx';
import store from './slices/index.js';
import * as actions from './slices/chatData.js';
import SocketContext from './contexts/socket.js';

const SocketProvider = ({ children }) => {
  const socket = io();
  const dispatch = useDispatch();

  socket.on('newMessage', (message) => {
    dispatch(actions.addMessage(message));
  });
  // todo если нет связи
  // todo когда закрывать соединение

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <SocketProvider>
        <App />
      </SocketProvider>
    </BrowserRouter>
  </Provider>,
);
