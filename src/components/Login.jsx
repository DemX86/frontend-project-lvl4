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
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import ApiContext from '../contexts/api.js';
import AuthContext from '../contexts/auth.js';
import routes from '../routes.js';

const Login = () => {
  const [isSubmitFailed, setSubmitFailed] = useState(false);
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
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const user = await api.login(values);
        auth.logIn(user);
        resetForm();
        navigate(routes.appRootPath());
      } catch (error) {
        if (error.isAxiosError && error.response.status === 401) {
          setSubmitFailed(true);
          return;
        }
        toast.error(t('errors.connectionError'));
      }
    },
  });

  return (
    <Container className="h-100" fluid>
      <Row className="h-100 justify-content-center align-content-center">
        <Col md={3}>
          <Form className="mb-2" onSubmit={formik.handleSubmit}>
            <h1 className="text-center mb-4">{t('loginPage.title')}</h1>

            <Form.FloatingLabel
              className="mb-3"
              controlId="username"
              label={t('loginPage.username')}
            >
              <Form.Control
                isInvalid={isSubmitFailed}
                name="username"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder={t('loginPage.username')}
                ref={inputRef}
                required
                value={formik.values.username}
              />
            </Form.FloatingLabel>

            <Form.FloatingLabel
              className="mb-3"
              controlId="password"
              label={t('loginPage.password')}
            >
              <Form.Control
                isInvalid={isSubmitFailed}
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder={t('loginPage.password')}
                required
                type="password"
                value={formik.values.password}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {isSubmitFailed ? t('loginPage.errors.submitError') : null}
              </Form.Control.Feedback>
            </Form.FloatingLabel>

            <Button
              className="w-100 mb-3"
              disabled={formik.isSubmitting}
              size="lg"
              type="submit"
              variant="primary"
            >
              {t('loginPage.button')}
            </Button>
          </Form>

          <div className="text-center">
            <span>
              {t('loginPage.noAccount')}
              &nbsp;
            </span>
            <Link to={routes.appSignupPath()}>{t('loginPage.signupLink')}</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
