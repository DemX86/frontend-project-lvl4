import React from 'react';
import i18n from 'i18next';
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { initReactI18next } from 'react-i18next';

import App from './components/App.jsx';
import resources from './locales/index.js';
import store from './slices/index.js';
import SocketContext from './contexts/socket.js';
import { actions as channelActions } from './slices/channelsDataSlice.js';
import { actions as messageActions } from './slices/messagesDataSlice.js';

const DEFAULT_CHANNEL_ID = 1;

const InitApp = async (socket) => {
  await i18n
    .use(initReactI18next)
    .init({
      lng: 'ru',
      interpolation: {
        escapeValue: false,
      },
      resources,
    });

  const rollbarConfig = {
    accessToken: process.env.ROLLBAR_TOKEN,
    environment: process.env.NODE_ENV,
  };

  socket.on('newChannel', (channel) => {
    store.dispatch(channelActions.addChannel(channel));
    store.dispatch(channelActions.setActiveChannelId(channel.id));
    const toastMessage = i18n.t('socketToasts.channelCreated');
    toast.success(toastMessage);
  });
  socket.on('renameChannel', (channel) => {
    store.dispatch(channelActions.renameChannel(channel));
    const toastMessage = i18n.t('socketToasts.channelRenamed');
    toast.success(toastMessage);
  });
  socket.on('removeChannel', (data) => {
    store.dispatch(channelActions.removeChannel(data));
    store.dispatch(channelActions.setActiveChannelId(DEFAULT_CHANNEL_ID));
    const toastMessage = i18n.t('socketToasts.channelRemoved');
    toast.success(toastMessage);
  });
  socket.on('newMessage', (message) => {
    store.dispatch(messageActions.addMessage(message));
  });
  socket.on('connect_error', (error) => {
    console.error(error);
    const toastMessage = i18n.t('socketToasts.connectionError');
    toast.success(toastMessage);
  });

  injectStyle();

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <ReduxProvider store={store}>
          <BrowserRouter>
            <SocketContext.Provider value={socket}>
              <App />
              <ToastContainer />
            </SocketContext.Provider>
          </BrowserRouter>
        </ReduxProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default InitApp;
