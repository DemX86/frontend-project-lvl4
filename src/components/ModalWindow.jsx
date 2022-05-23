import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { modalActions } from '../slices/modalDataSlice.js';
import getModalContent from './modalContents/getModalContent.js';
import selectors from '../slices/selectors.js';

const ModalWindow = () => {
  const dispatch = useDispatch();
  const isModalActive = useSelector(selectors.selectModalActivity);
  const modalType = useSelector(selectors.selectModalType);

  if (!isModalActive) {
    return null;
  }

  const handleCloseModal = () => {
    dispatch(modalActions.hideModal({}));
  };

  return (
    <Modal show onHide={handleCloseModal}>
      {React.createElement(getModalContent(modalType), { handleCloseModal })}
    </Modal>
  );

};

export default ModalWindow;
