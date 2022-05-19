import React, { useContext, useEffect, useRef } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import filter from 'leo-profanity';
import { toast } from 'react-toastify';

import ApiContext from '../../contexts/api.js';
import AuthContext from '../../contexts/auth.js';

filter.loadDictionary('ru');
filter.add(filter.getDictionary('en'));

const Input = ({ props }) => {
  const { activeChannelId, t } = props;
  const api = useContext(ApiContext);
  const auth = useContext(AuthContext);

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async (values, { resetForm }) => {
      const data = {
        body: filter.clean(values.body),
        channelId: activeChannelId,
        username: auth.getUsername(),
      };
      try {
        await api.sendMessage(data);
      } catch (error) {
        toast.error(t('errors.connectionError'));
        return;
      }
      resetForm();
    },
  });

  return (
    <div className="mt-auto p-4">
      <Form onSubmit={formik.handleSubmit}>
        <InputGroup>
          <Form.Control
            autoComplete="off"
            id="body"
            name="body"
            placeholder={t('placeholder')}
            aria-label={t('ariaLabel')}
            ref={inputRef}
            onChange={formik.handleChange}
            value={formik.values.body}
          />
          <Button
            disabled={formik.isSubmitting || !formik.dirty}
            type="submit"
          >
            {t('send')}
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default Input;
