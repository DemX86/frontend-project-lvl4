import React, { useContext } from 'react';
import { Navbar } from 'react-bootstrap';
import { Navigate, Route, Routes } from 'react-router-dom';

import AuthContext from '../contexts/auth.js';
import AuthProvider from './AuthProvider.jsx';
import Chat from './Chat.jsx';
import Login from './Login.jsx';
import NavbarItems from './NavbarItems.jsx';
import NotFound from './NotFound.jsx';
import Signup from './Signup.jsx';

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
