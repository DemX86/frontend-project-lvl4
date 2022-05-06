import React, { useContext, useEffect, useRef } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import filter from 'leo-profanity';

import SocketContext from '../../contexts/socket.js';

filter.loadDictionary('ru');
filter.add(filter.getDictionary('en'));

const Input = ({ props }) => {
  const { activeChannelId, t, username } = props;
  const socket = useContext(SocketContext);

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: (values, { resetForm }) => {
      const message = {
        body: filter.clean(values.body),
        channelId: activeChannelId,
        username,
      };
      socket.emit('newMessage', message);
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
