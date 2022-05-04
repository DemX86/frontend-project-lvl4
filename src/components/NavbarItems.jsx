import React, { useContext } from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import AuthContext from '../contexts/auth.js';

const NavbarItems = () => {
  const auth = useContext(AuthContext);

  return (
    <Container>
      <Navbar.Brand>Hexlet Chat</Navbar.Brand>
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
