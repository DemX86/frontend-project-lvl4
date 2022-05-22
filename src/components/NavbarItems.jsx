import React, { useContext } from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import AuthContext from '../contexts/auth.js';
import routes from '../routes.js';

const NavbarItems = () => {
  const auth = useContext(AuthContext);
  const { t } = useTranslation('translation', { keyPrefix: 'navbar' });

  return (
    <Container>
      <Navbar.Brand as={Link} to={routes.appRootPath()}>
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
