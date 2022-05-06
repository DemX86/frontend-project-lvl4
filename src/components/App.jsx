import React, { useContext, useState } from 'react';
import { Navbar } from 'react-bootstrap';
import { Navigate, Route, Routes } from 'react-router-dom';

import AuthContext from '../contexts/auth.js';
import Chat from './Chat.jsx';
import Login from './Login.jsx';
import NavbarItems from './NavbarItems.jsx';
import NotFound from './NotFound.jsx';
import Signup from './Signup.jsx';

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

export default App;
