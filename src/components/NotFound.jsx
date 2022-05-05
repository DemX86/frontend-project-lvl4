import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'notFoundPage' });

  return (
    <Container className="h-100" fluid>
      <Row className="h-100 justify-content-center align-content-center">
        <Col className="col-md-4">
          <h1 className="text-center mb-4">{t('notFound')}</h1>
          <div className="text-center">
            <span>
              {t('help')}
              &nbsp;
            </span>
            <Link to="/">{t('homeLink')}</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
