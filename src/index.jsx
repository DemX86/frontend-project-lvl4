import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import { io } from 'socket.io-client';
import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { useTranslation } from 'react-i18next';

import './i18n';
import App from './components/App.jsx';
import { actions as channelActions } from './slices/channelsDataSlice.js';
import { actions as messageActions } from './slices/messagesDataSlice.js';
import store from './slices/index.js';
import SocketContext from './contexts/socket.js';

const DEFAULT_CHANNEL_ID = 1;

const SocketProvider = ({ children }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'socketToasts' });

  const socket = io();
  const dispatch = useDispatch();

  socket.on('newChannel', (channel) => {
    dispatch(channelActions.addChannel(channel));
    dispatch(channelActions.setActiveChannelId(channel.id));
    toast.success(t('channelCreated'));
  });
  socket.on('renameChannel', (channel) => {
    dispatch(channelActions.renameChannel(channel));
    toast.success(t('channelRenamed'));
  });
  socket.on('removeChannel', (data) => {
    dispatch(channelActions.removeChannel(data));
    dispatch(channelActions.setActiveChannelId(DEFAULT_CHANNEL_ID));
    toast.success(t('channelRemoved'));
  });
  socket.on('newMessage', (message) => {
    dispatch(messageActions.addMessage(message));
  });
  socket.on('connect_error', (error) => {
    console.error(error);
    toast.error(t('connectionError'));
  });

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

injectStyle();

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <SocketProvider>
        <App />
        <ToastContainer />
      </SocketProvider>
    </BrowserRouter>
  </Provider>,
);
