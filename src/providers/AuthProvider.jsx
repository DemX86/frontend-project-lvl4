import React, { useMemo, useState } from 'react';

import AuthContext from '../contexts/auth.js';

const AuthProvider = ({ children }) => {
  const initialState = Boolean(localStorage.getItem('user'));
  const [loggedIn, setLoggedIn] = useState(initialState);

  const logIn = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  const getUsername = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.username;
  };

  const auth = useMemo(() => ({
    loggedIn,
    logIn,
    logOut,
    getUsername,
  }), [loggedIn]);

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
