import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <Row className="justify-content-center">
    <Col className="col-md-4">
      <h1 className="text-center mb-4">Страница не найдена</h1>
      <div className="text-center">
        <span>Но вы всегда можете&nbsp;</span>
        <Link to="/">перейти на главную</Link>
      </div>
    </Col>
  </Row>
);

export default NotFound;
