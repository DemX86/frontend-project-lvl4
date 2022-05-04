import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { object, string } from 'yup';

import AuthContext from '../contexts/auth.js';
import routes from '../routes.js';

const Login = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

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
    validationSchema: object({
      username: string()
        .required(),
      password: string()
        .required(),
    }),
    onSubmit: async (values) => {
      try {
        const url = routes.loginPath();
        const response = await axios.post(url, values);
        localStorage.setItem('user', JSON.stringify(response.data));
        auth.logIn();
        navigate('/');
      } catch (error) {
        if (error.isAxiosError && error.response.status === 401) {
          setAuthFailed(true);
          return;
        }
        throw error;
      }
    },
  });
  // todo ошибки yup на русском языке

  const invalidUsername = formik.touched.username && formik.errors.username;
  const invalidPassword = formik.touched.password && formik.errors.password;

  return (
    <Row className="justify-content-center">
      <Col md={3}>
        <Form className="mb-2" onSubmit={formik.handleSubmit}>
          <h1 className="text-center mb-4">Вход</h1>

          <Form.FloatingLabel
            className="mb-3"
            controlId="username"
            label="Имя пользователя"
          >
            <Form.Control
              isInvalid={authFailed || invalidUsername}
              name="username"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Имя пользователя"
              ref={inputRef}
              required
              value={formik.values.username}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.username}
            </Form.Control.Feedback>
          </Form.FloatingLabel>

          <Form.FloatingLabel
            className="mb-3"
            controlId="password"
            label="Пароль"
          >
            <Form.Control
              isInvalid={authFailed || invalidPassword}
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Пароль"
              required
              type="password"
              value={formik.values.password}
            />
            <Form.Control.Feedback type="invalid">
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
  );
};

export default Login;
