import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { Button, Form, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import ApiContext from '../../contexts/api.js';
import selectors from '../../slices/selectors.js';

const RemoveChannelModalContent = ({ handleCloseModal }) => {
  const api = useContext(ApiContext);
  const modalChannelId = useSelector(selectors.selectModalChannelId);
  const channelToRemove = useSelector(selectors.selectModalChannel);
  const { t } = useTranslation();

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
      toast.success(t('modals.removeChannel.channelRemoved'));
      handleCloseModal();
    },
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.removeChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {t('modals.removeChannel.confirm')}
          &nbsp;
          <strong>{channelToRemove?.name}</strong>
          ?
        </p>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Footer className="px-0 pb-0">
            <Button
              onClick={handleCloseModal}
              variant="secondary"
            >
              {t('modals.removeChannel.cancel')}
            </Button>
            <Button
              disabled={formik.isSubmitting}
              type="submit"
              variant="danger"
            >
              {t('modals.removeChannel.submit')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </>
  );
};

export default RemoveChannelModalContent;
