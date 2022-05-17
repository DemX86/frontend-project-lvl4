import React, { useMemo, useState } from 'react';

import AuthContext from '../contexts/auth.js';

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

  const auth = useMemo(() => ({
    loggedIn,
    logIn,
    logOut,
  }), [loggedIn]);

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
