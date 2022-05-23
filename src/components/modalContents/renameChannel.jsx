import React, { useContext, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Button, Form, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';

import ApiContext from '../../contexts/api.js';
import selectors from '../../slices/selectors.js';

const RenameChannelModalContent = ({ handleCloseModal }) => {
  const api = useContext(ApiContext);
  const channelNames = useSelector(selectors.selectChannelNames);
  const modalChannelId = useSelector(selectors.selectModalChannelId);
  const channelToRename = useSelector(selectors.selectModalChannel);
  const { t } = useTranslation('translation', { keyPrefix: 'modals.renameChannel' });

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: channelToRename.name,
    },
    validationSchema: object({
      name: string()
        .trim()
        .notOneOf(channelNames, t('errors.alreadyExists')),
    }),
    onSubmit: async (values, { resetForm }) => {
      const data = {
        id: modalChannelId,
        name: values.name.trim(),
      };
      try {
        await api.renameChannel(data);
      } catch (error) {
        toast.error(t('errors.connectionError'));
        return;
      }
      toast.success(t('channelRenamed'));
      resetForm();
      handleCloseModal();
    },
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="name" visuallyHidden>
              {t('label')}
            </Form.Label>
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
    </>
  );
};

export default RenameChannelModalContent;
