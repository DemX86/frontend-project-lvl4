import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { Button, Form, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import SocketContext from '../../contexts/socket.js';

const RemoveChannelModal = ({ handleCloseModal }) => {
  const socket = useContext(SocketContext);

  const { channels } = useSelector((state) => state.channelsData);
  const { modalChannelId } = useSelector((state) => state.modalData);
  const currentChannel = channels.find((channel) => channel.id === modalChannelId);

  const formik = useFormik({
    initialValues: {},
    onSubmit: () => {
      socket.emit('removeChannel', { id: modalChannelId });
      handleCloseModal();
    },
  });

  return (
    <Modal show onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Удаление канала</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Вы действительно хотите удалить канал&nbsp;
          <strong>{currentChannel.name}</strong>
          ?
        </p>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Footer className="px-0 pb-0">
            <Button
              onClick={handleCloseModal}
              variant="secondary"
            >
              Отмена
            </Button>
            <Button
              disabled={formik.isSubmitting}
              type="submit"
              variant="danger"
            >
              Удалить
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
