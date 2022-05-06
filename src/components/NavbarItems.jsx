import React, { useContext } from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import AuthContext from '../contexts/auth.js';

const NavbarItems = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'navbar' });

  const auth = useContext(AuthContext);

  return (
    <Container>
      <Navbar.Brand href="/">
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
