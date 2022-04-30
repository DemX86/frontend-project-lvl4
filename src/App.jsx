import React, { useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Navigate, Route, Routes } from 'react-router-dom';

import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import NotFound from './components/NotFound.jsx';
import Signup from './components/Signup.jsx';
import AuthContext from './contexts/auth.jsx';
import useAuth from './hooks/auth.jsx';

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
    <AuthContext.Provider value={{
      loggedIn,
      logIn,
      logOut,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  return auth.loggedIn ? children : <Navigate to="/login" />;
};

const App = () => (
  <AuthProvider>
    <Navbar bg="white" expand="lg" variant="light" className="shadow-sm mb-4">
      <Container>
        <Navbar.Brand>Hexlet Chat</Navbar.Brand>
      </Container>
    </Navbar>

    <Routes>
      <Route
        path="/"
        element={(
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        )}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </AuthProvider>
);

export default App;
