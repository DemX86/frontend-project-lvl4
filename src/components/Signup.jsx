import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
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
  const [submitFailed, setSubmitFailed] = useState(false);
  const api = useContext(ApiContext);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation('translation', { keyPrefix: 'signupPage' });

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
        .required(t('errors.required'))
        .min(3, t('errors.usernameLength'))
        .max(20, t('errors.usernameLength')),
      password: string()
        .required(t('errors.required'))
        .min(6, t('errors.passwordMin')),
      confirmPassword: string()
        .required(t('errors.required'))
        .oneOf([ref('password')], t('errors.passwordsMatch')),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const user = await api.signup(values);
        auth.logIn(user);
        resetForm();
        navigate(routes.appRootPath());
      } catch (error) {
        if (error.isAxiosError && error.response.status === 409) {
          setSubmitFailed(true);
          return;
        }
        toast.error(t('errors.connectionError'));
      }
    },
  });

  const invalidUsername = formik.touched.username && formik.errors.username;
  const invalidPassword = formik.touched.password && formik.errors.password;
  const invalidConfirmPassword = formik.touched.confirmPassword && formik.errors.confirmPassword;
  const invalidForm = invalidUsername || invalidPassword || invalidConfirmPassword;

  return (
    <Container className="h-100" fluid>
      <Row className="h-100 justify-content-center align-content-center">
        <Col md={3}>
          <Form className="mb-2" onSubmit={formik.handleSubmit}>
            <h1 className="text-center mb-4">{t('title')}</h1>

            <Form.FloatingLabel
              className="mb-3"
              controlId="username"
              label={t('username')}
            >
              <Form.Control
                isInvalid={invalidUsername || submitFailed}
                name="username"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder={t('username')}
                ref={inputRef}
                required
                value={formik.values.username}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {submitFailed ? t('submitError') : formik.errors.username}
              </Form.Control.Feedback>
            </Form.FloatingLabel>

            <Form.FloatingLabel
              className="mb-3"
              controlId="password"
              label={t('password')}
            >
              <Form.Control
                isInvalid={invalidPassword}
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder={t('password')}
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
              label={t('confirmPassword')}
            >
              <Form.Control
                isInvalid={invalidConfirmPassword}
                name="confirmPassword"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder={t('confirmPassword')}
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
              disabled={formik.isSubmitting || invalidForm}
              size="lg"
              type="submit"
              variant="primary"
            >
              {t('button')}
            </Button>
          </Form>

          <div className="text-center">
            <span>
              {t('hasAccount')}
              &nbsp;
            </span>
            <Link to={routes.appLoginPath()}>{t('loginLink')}</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
