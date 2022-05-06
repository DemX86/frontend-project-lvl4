import React, { useContext, useState } from 'react';
import { Navbar } from 'react-bootstrap';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import AuthContext from '../contexts/auth.js';
import Chat from './Chat.jsx';
import Login from './Login.jsx';
import NavbarItems from './NavbarItems.jsx';
import NotFound from './NotFound.jsx';
import Signup from './Signup.jsx';
import { actions as channelActions } from '../slices/channelsDataSlice.js';
import { actions as messageActions } from '../slices/messagesDataSlice.js';
import SocketContext from '../contexts/socket.js';

const DEFAULT_CHANNEL_ID = 1;

const AuthProvider = ({ children }) => {
  const initialState = Boolean(localStorage.getItem('user'));
  const [loggedIn, setLoggedIn] = useState(initialState);

  const logIn = () => {
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useContext(AuthContext);
  return auth.loggedIn ? children : <Navigate to="/login" />;
};

const App = () => {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  const { t } = useTranslation('translation', { keyPrefix: 'socketToasts' });

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
    <AuthProvider>
      <div className="h-100 d-flex flex-column">
        <Navbar bg="white" expand="lg" variant="light" className="shadow-sm">
          <NavbarItems />
        </Navbar>

        <Routes>
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            )}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
