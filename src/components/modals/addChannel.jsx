import React, { useContext, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Button, Form, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';

import SocketContext from '../../contexts/socket.js';

const AddChannelModal = ({ handleCloseModal }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'modals.addChannel' });

  const socket = useContext(SocketContext);

  const { channels } = useSelector((state) => state.channelsData);
  const channelNames = channels.map((channel) => channel.name);

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: object({
      name: string()
        .trim()
        .notOneOf(channelNames, t('errors.alreadyExists')),
    }),
    onSubmit: (values) => {
      const channel = {
        name: values.name.trim(),
      };
      socket.emit('newChannel', channel);
      handleCloseModal();
    },
  });

  return (
    <Modal show onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-3"
              id="name"
              isInvalid={Boolean(formik.errors.name)}
              name="name"
              onChange={formik.handleChange}
              placeholder={t('placeholder')}
              ref={inputRef}
              required
              value={formik.values.name}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Modal.Footer className="px-0 pb-0">
            <Button
              onClick={handleCloseModal}
              variant="secondary"
            >
              {t('cancel')}
            </Button>
            <Button
              disabled={formik.isSubmitting || !isEmpty(formik.errors) || !formik.dirty}
              type="submit"
              variant="primary"
            >
              {t('submit')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
