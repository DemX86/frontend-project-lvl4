import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { object, ref, string } from 'yup';
import { useFormik } from 'formik';

import AuthContext from '../contexts/auth.js';
import routes from '../routes.js';

const Signup = () => {
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
      confirmPassword: '',
    },
    validationSchema: object({
      username: string()
        .required()
        .min(3)
        .max(20),
      password: string()
        .required()
        .min(6),
      confirmPassword: string()
        .required()
        .oneOf([ref('password')]),
    }),
    onSubmit: async (values) => {
      try {
        const url = routes.signupPath();
        const response = await axios.post(url, values);
        localStorage.setItem('user', JSON.stringify(response.data));
        auth.logIn();
        navigate('/');
      } catch (error) {
        if (error.isAxiosError && error.response.status === 409) {
          setSubmitFailed(true);
          return;
        }
        throw error;
      }
    },
  });

  const invalidUsername = formik.touched.username && formik.errors.username;
  const invalidPassword = formik.touched.password && formik.errors.password;
  const invalidConfirmPassword = formik.touched.confirmPassword && formik.errors.confirmPassword;

  return (
    <Container className="h-100" fluid>
      <Row className="h-100 justify-content-center align-content-center">
        <Col md={3}>
          <Form className="mb-2" onSubmit={formik.handleSubmit}>
            <h1 className="text-center mb-4">Регистрация</h1>

            <Form.FloatingLabel
              className="mb-3"
              controlId="username"
              label="Имя пользователя"
            >
              <Form.Control
                isInvalid={invalidUsername || submitFailed}
                name="username"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="Имя пользователя"
                ref={inputRef}
                required
                value={formik.values.username}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {formik.errors.username || 'Это имя пользователя занято'}
              </Form.Control.Feedback>
            </Form.FloatingLabel>

            <Form.FloatingLabel
              className="mb-3"
              controlId="password"
              label="Пароль"
            >
              <Form.Control
                isInvalid={invalidPassword}
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="Пароль"
                required
                type="password"
                value={formik.values.password}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.FloatingLabel>

            <Form.FloatingLabel
              className="mb-3"
              controlId="confirmPassword"
              label="Подтвердите пароль"
            >
              <Form.Control
                isInvalid={invalidConfirmPassword}
                name="confirmPassword"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="Подтвердите пароль"
                required
                type="password"
                value={formik.values.confirmPassword}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {formik.errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.FloatingLabel>

            <Button
              className="w-100 mb-3"
              disabled={formik.isSubmitting}
              size="lg"
              type="submit"
              variant="primary"
            >
              Зарегистрироваться
            </Button>
          </Form>

          <div className="text-center">
            <span>Уже зарегистрированы?&nbsp;</span>
            <Link to="/login">Войдите</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
