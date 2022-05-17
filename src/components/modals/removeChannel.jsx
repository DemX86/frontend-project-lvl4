import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { Button, Form, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import ApiContext from '../../contexts/api.js';

const RemoveChannelModal = ({ handleCloseModal }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'modals.removeChannel' });
  const api = useContext(ApiContext);
  const { channels } = useSelector((state) => state.channelsData);
  const { modalChannelId } = useSelector((state) => state.modalData);

  const currentChannel = channels.find((channel) => channel.id === modalChannelId);

  const formik = useFormik({
    initialValues: {},
    onSubmit: async () => {
      const data = { id: modalChannelId };
      try {
        await api.removeChannel(data);
      } catch (error) {
        toast.error(t('errors.connectionError'));
        return;
      }
      toast.success(t('channelRemoved'));
      handleCloseModal();
    },
  });

  return (
    <Modal show onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {t('confirm')}
          &nbsp;
          <strong>{currentChannel?.name}</strong>
          ?
        </p>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Footer className="px-0 pb-0">
            <Button
              onClick={handleCloseModal}
              variant="secondary"
            >
              {t('cancel')}
            </Button>
            <Button
              disabled={formik.isSubmitting}
              type="submit"
              variant="danger"
            >
              {t('submit')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
