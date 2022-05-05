import React, { useContext, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Button, Form, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';

import SocketContext from '../../contexts/socket.js';

const RenameChannelModal = ({ handleCloseModal }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'modals.renameChannel' });

  const socket = useContext(SocketContext);

  const { channels } = useSelector((state) => state.channelsData);
  const { modalChannelId } = useSelector((state) => state.modalData);

  const channelNames = channels.map((channel) => channel.name);
  const currentChannel = channels.find((channel) => channel.id === modalChannelId);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: currentChannel.name,
    },
    validationSchema: object({
      name: string()
        .trim()
        .notOneOf(channelNames, t('errors.alreadyExists')),
    }),
    onSubmit: (values) => {
      const data = {
        id: modalChannelId,
        name: values.name.trim(),
      };
      socket.emit('renameChannel', data);
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

export default RenameChannelModal;
