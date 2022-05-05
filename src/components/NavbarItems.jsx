import React, { useContext } from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import AuthContext from '../contexts/auth.js';

const NavbarItems = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'navbar' });

  const auth = useContext(AuthContext);
  const location = useLocation();

  return (
    <Container>
      <Navbar.Brand href={location.pathname !== '/' ? '/' : null}>
        {t('project')}
      </Navbar.Brand>
      {auth.loggedIn
        ? (
          <Button onClick={auth.logOut} variant="warning">
            {t('logout')}
          </Button>
        ) : null}
    </Container>
  );
};

export default NavbarItems;
