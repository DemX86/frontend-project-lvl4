import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import AuthContext from '../contexts/auth.js';
import routes from '../routes.js';

const Login = () => {
  const [submitFailed, setSubmitFailed] = useState(false);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const inputRef = useRef();
  useEffect(() => {
    if (auth.loggedIn) {
      navigate('/');
    }
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const url = routes.loginPath();
        const response = await axios.post(url, values);
        localStorage.setItem('user', JSON.stringify(response.data));
        auth.logIn();
        navigate('/');
      } catch (error) {
        if (error.isAxiosError && error.response.status === 401) {
          setSubmitFailed(true);
          return;
        }
        throw error;
      }
    },
  });

  return (
    <Container className="h-100" fluid>
      <Row className="h-100 justify-content-center align-content-center">
        <Col md={3}>
          <Form className="mb-2" onSubmit={formik.handleSubmit}>
            <h1 className="text-center mb-4">Вход</h1>

            <Form.FloatingLabel
              className="mb-3"
              controlId="username"
              label="Имя пользователя"
            >
              <Form.Control
                isInvalid={submitFailed}
                name="username"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="Имя пользователя"
                ref={inputRef}
                required
                value={formik.values.username}
              />
            </Form.FloatingLabel>

            <Form.FloatingLabel
              className="mb-3"
              controlId="password"
              label="Пароль"
            >
              <Form.Control
                isInvalid={submitFailed}
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="Пароль"
                required
                type="password"
                value={formik.values.password}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {formik.errors.password || 'Неверные имя пользователя и/или пароль'}
              </Form.Control.Feedback>
            </Form.FloatingLabel>

            <Button
              className="w-100 mb-3"
              disabled={formik.isSubmitting}
              size="lg"
              type="submit"
              variant="primary"
            >
              Войти
            </Button>
          </Form>

          <div className="text-center">
            <span>Нет аккаунта?&nbsp;</span>
            <Link to="/signup">Зарегистрируйтесь</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
