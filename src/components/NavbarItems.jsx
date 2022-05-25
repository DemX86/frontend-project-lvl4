import React, { useContext } from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import AuthContext from '../contexts/auth.js';
import routes from '../routes.js';

const NavbarItems = () => {
  const auth = useContext(AuthContext);
  const { t } = useTranslation();

  return (
    <Container>
      <Navbar.Brand as={Link} to={routes.appRootPath()}>
        {t('navbar.project')}
      </Navbar.Brand>
      {auth.loggedIn
        ? (
          <Button onClick={auth.logOut} variant="warning">
            {t('navbar.logout')}
          </Button>
        ) : null}
    </Container>
  );
};

export default NavbarItems;
