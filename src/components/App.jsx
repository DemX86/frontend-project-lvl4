import React, { useContext } from 'react';
import { Navbar } from 'react-bootstrap';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import AuthContext from '../contexts/auth.js';
import AuthProvider from '../providers/AuthProvider.jsx';
import Chat from './Chat.jsx';
import Login from './Login.jsx';
import NavbarItems from './NavbarItems.jsx';
import NotFound from './NotFound.jsx';
import Signup from './Signup.jsx';
import routes from '../routes.js';

const PrivateRoute = ({ children }) => {
  const auth = useContext(AuthContext);
  return auth.loggedIn ? children : <Navigate to="/login" />;
};

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <div className="h-100 d-flex flex-column">
        <Navbar bg="white" expand="lg" variant="light" className="shadow-sm">
          <NavbarItems />
        </Navbar>
        <Routes>
          <Route
            path={routes.appRootPath()}
            element={(
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            )}
          />
          <Route path={routes.appLoginPath()} element={<Login />} />
          <Route path={routes.appSignupPath()} element={<Signup />} />
          <Route path={routes.appAnyPath()} element={<NotFound />} />
        </Routes>
      </div>
      <ToastContainer />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
