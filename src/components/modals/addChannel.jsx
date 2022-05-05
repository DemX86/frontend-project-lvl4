import React, { useContext, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Button, Form, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import SocketContext from '../../contexts/socket.js';

const AddChannelModal = ({ handleCloseModal }) => {
  const socket = useContext(SocketContext);

  const { channels } = useSelector((state) => state.channelsData);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validate = (values) => {
    const errors = {};
    if (channels.some((channel) => channel.name === values.name.trim())) {
      errors.name = 'Канал с таким именем уже существует';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validate,
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
        <Modal.Title>Создание канала</Modal.Title>
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
              placeholder="Введите название нового канала"
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
              Отмена
            </Button>
            <Button
              disabled={formik.isSubmitting || !isEmpty(formik.errors) || !formik.dirty}
              type="submit"
              variant="primary"
            >
              Создать
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
