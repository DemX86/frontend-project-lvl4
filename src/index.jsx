import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import { io } from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react';
import { Provider as ReduxProvider, useDispatch } from 'react-redux';
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

const rollbarConfig = {
  accessToken: '3d4990a9b75c4bd88be6a2790b89b1a5',
  environment: 'production',
};

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

const container = document.getElementById('chat');
ReactDOM.render(
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <SocketProvider>
            <App />
            <ToastContainer />
          </SocketProvider>
        </BrowserRouter>
      </ReduxProvider>
    </ErrorBoundary>
  </RollbarProvider>,
  container,
);
