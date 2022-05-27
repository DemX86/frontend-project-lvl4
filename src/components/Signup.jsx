import React, { useContext, useEffect, useRef } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  Row,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { object, ref, string } from 'yup';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import ApiContext from '../contexts/api.js';
import AuthContext from '../contexts/auth.js';
import routes from '../routes.js';

const Signup = () => {
  const api = useContext(ApiContext);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const inputRef = useRef(null);
  useEffect(() => {
    if (auth.loggedIn) {
      navigate(routes.appRootPath());
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
        .required(t('signupPage.errors.required'))
        .min(3, t('signupPage.errors.usernameLength'))
        .max(20, t('signupPage.errors.usernameLength')),
      password: string()
        .required(t('signupPage.errors.required'))
        .min(6, t('signupPage.errors.passwordMin')),
      confirmPassword: string()
        .required(t('signupPage.errors.required'))
        .oneOf([ref('password')], t('signupPage.errors.passwordsMatch')),
    }),
    onSubmit: async (values, { setErrors, resetForm }) => {
      try {
        const user = await api.signup(values);
        auth.logIn(user);
        resetForm();
        navigate(routes.appRootPath());
      } catch (error) {
        if (error.isAxiosError && error.response.status === 409) {
          setErrors({ submit: t('signupPage.errors.submit') });
          return;
        }
        toast.error(t('errors.connectionError'));
      }
    },
  });

  const isInvalidUsername = formik.touched.username && formik.errors.username;
  const isInvalidPassword = formik.touched.password && formik.errors.password;
  const isInvalidConfirmPassword = formik.touched.confirmPassword && formik.errors.confirmPassword;
  const isInvalidForm = isInvalidUsername || isInvalidPassword || isInvalidConfirmPassword;

  return (
    <Container className="h-100" fluid>
      <Row className="h-100 justify-content-center align-content-center">
        <Col md={3}>
          <Form className="mb-2" onSubmit={formik.handleSubmit}>
            <h1 className="text-center mb-4">{t('signupPage.title')}</h1>

            <Form.FloatingLabel
              className="mb-3"
              controlId="username"
              label={t('signupPage.username')}
            >
              <Form.Control
                isInvalid={isInvalidUsername || formik.errors.submit}
                name="username"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder={t('signupPage.username')}
                ref={inputRef}
                required
                value={formik.values.username}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {formik.errors.submit || formik.errors.username}
              </Form.Control.Feedback>
            </Form.FloatingLabel>

            <Form.FloatingLabel
              className="mb-3"
              controlId="password"
              label={t('signupPage.password')}
            >
              <Form.Control
                isInvalid={isInvalidPassword}
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder={t('signupPage.password')}
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
              label={t('signupPage.confirmPassword')}
            >
              <Form.Control
                isInvalid={isInvalidConfirmPassword}
                name="confirmPassword"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder={t('signupPage.confirmPassword')}
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
              disabled={formik.isSubmitting || isInvalidForm}
              size="lg"
              type="submit"
              variant="primary"
            >
              {t('signupPage.button')}
            </Button>
          </Form>

          <div className="text-center">
            <span>
              {t('signupPage.hasAccount')}
              &nbsp;
            </span>
            <Link to={routes.appLoginPath()}>{t('signupPage.loginLink')}</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
