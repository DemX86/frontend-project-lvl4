import React from 'react';
import i18n from 'i18next';
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react';
import { Provider as ReduxProvider } from 'react-redux';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { initReactI18next } from 'react-i18next';

import ApiProvider from './providers/ApiProvider.jsx';
import App from './components/App.jsx';
import resources from './locales/index.js';
import store from './slices/index.js';
import { actions as channelActions } from './slices/channelsDataSlice.js';
import { actions as messageActions } from './slices/messagesDataSlice.js';

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
  });
  socket.on('renameChannel', (channel) => {
    store.dispatch(channelActions.renameChannel(channel));
  });
  socket.on('removeChannel', (data) => {
    store.dispatch(channelActions.removeChannel(data));
  });
  socket.on('newMessage', (message) => {
    store.dispatch(messageActions.addMessage(message));
  });

  injectStyle();

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <ReduxProvider store={store}>
          <ApiProvider socket={socket}>
            <App />
          </ApiProvider>
        </ReduxProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default InitApp;
