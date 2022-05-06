import React from 'react';
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

import './i18n';
import App from './components/App.jsx';
import store from './slices/index.js';
import SocketContext from './contexts/socket.js';

const InitApp = ({ socket }) => {
  const rollbarConfig = {
    accessToken: '3d4990a9b75c4bd88be6a2790b89b1a5',
    environment: 'production',
  };

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
