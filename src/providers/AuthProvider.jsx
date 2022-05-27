import React, { useMemo, useState } from 'react';

import AuthContext from '../contexts/auth.js';

const AuthProvider = ({ children }) => {
  const getUser = () => JSON.parse(localStorage.getItem('user'));

  const initialState = Boolean(getUser());
  const [loggedIn, setLoggedIn] = useState(initialState);

  const logIn = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
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
    getUser,
  }), [loggedIn]);

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
