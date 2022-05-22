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

const RequireAuth = ({ children }) => {
  const auth = useContext(AuthContext);
  return auth.loggedIn ? children : <Navigate to={routes.appLoginPath()} />;
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="h-100 d-flex flex-column">
        <Navbar bg="white" expand="lg" variant="light" className="shadow-sm">
          <NavbarItems />
        </Navbar>
        <Routes>
          <Route
            path={routes.appRootPath()}
            element={(
              <RequireAuth>
                <Chat />
              </RequireAuth>
            )}
          />
          <Route path={routes.appLoginPath()} element={<Login />} />
          <Route path={routes.appSignupPath()} element={<Signup />} />
          <Route path={routes.appAnyPath()} element={<NotFound />} />
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
