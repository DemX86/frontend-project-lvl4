import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routes from '../routes.js';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <Container className="h-100" fluid>
      <Row className="h-100 justify-content-center align-content-center">
        <Col className="col-md-4">
          <h1 className="text-center mb-4">{t('notFoundPage.notFound')}</h1>
          <div className="text-center">
            <span>
              {t('notFoundPage.help')}
              &nbsp;
            </span>
            <Link to={routes.appRootPath()}>{t('notFoundPage.homeLink')}</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
