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

const AddChannelModalContent = ({ handleCloseModal }) => {
  const api = useContext(ApiContext);
  const channelNames = useSelector(selectors.selectChannelNames);
  const { t } = useTranslation();

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
        .notOneOf(channelNames, t('modals.errors.alreadyExists')),
    }),
    onSubmit: async (values, { resetForm }) => {
      const data = { name: values.name.trim() };
      try {
        await api.createChannel(data);
      } catch (error) {
        toast.error(t('errors.connectionError'));
        return;
      }
      toast.success(t('modals.addChannel.channelCreated'));
      resetForm();
      handleCloseModal();
    },
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.addChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="name" visuallyHidden>
              {t('modals.addChannel.label')}
            </Form.Label>
            <Form.Control
              className="mb-3"
              id="name"
              isInvalid={Boolean(formik.errors.name)}
              name="name"
              onChange={formik.handleChange}
              placeholder={t('modals.addChannel.placeholder')}
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
              {t('modals.addChannel.cancel')}
            </Button>
            <Button
              disabled={formik.isSubmitting || !isEmpty(formik.errors) || !formik.dirty}
              type="submit"
              variant="primary"
            >
              {t('modals.addChannel.submit')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </>
  );
};

export default AddChannelModalContent;
