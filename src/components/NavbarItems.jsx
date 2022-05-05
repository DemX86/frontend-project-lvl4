import React, { useContext } from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

import AuthContext from '../contexts/auth.js';

const NavbarItems = () => {
  const auth = useContext(AuthContext);
  const location = useLocation();

  return (
    <Container>
      <Navbar.Brand href={location.pathname !== '/' ? '/' : null}>
        Hexlet Chat
      </Navbar.Brand>
      {auth.loggedIn
        ? (
          <Button onClick={auth.logOut} variant="warning">
            Выйти
          </Button>
        ) : null}
    </Container>
  );
};

export default NavbarItems;
