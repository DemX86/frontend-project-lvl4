import { io } from 'socket.io-client';
import React, { useContext, useState } from 'react';
import { Navbar } from 'react-bootstrap';
import { Navigate, Route, Routes } from 'react-router-dom';

import Home from './Home.jsx';
import Login from './Login.jsx';
import NotFound from './NotFound.jsx';
import Signup from './Signup.jsx';
import AuthContext from '../contexts/auth.js';
import SocketContext from '../contexts/socket.js';
import NavbarItems from './NavbarItems.jsx';

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

const SocketProvider = ({ children }) => {
  const socket = io();
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useContext(AuthContext);
  return auth.loggedIn ? children : <Navigate to="/login" />;
};

const App = () => (
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
              <SocketProvider>
                <Home />
              </SocketProvider>
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

export default App;
