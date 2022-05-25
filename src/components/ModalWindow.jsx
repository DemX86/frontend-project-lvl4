import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import AddChannelModalContent from './modalContents/addChannel.jsx';
import RenameChannelModalContent from './modalContents/renameChannel.jsx';
import RemoveChannelModalContent from './modalContents/removeChannel.jsx';
import { modalActions } from '../slices/modalDataSlice.js';
import selectors from '../slices/selectors.js';

const mappingModalComponents = {
  addChannel: AddChannelModalContent,
  renameChannel: RenameChannelModalContent,
  removeChannel: RemoveChannelModalContent,
};

const ModalWindow = () => {
  const dispatch = useDispatch();
  const isModalActive = useSelector(selectors.selectModalActivity);
  const modalType = useSelector(selectors.selectModalType);

  const ModalContent = mappingModalComponents[modalType];

  const handleCloseModal = () => {
    dispatch(modalActions.hideModal({}));
  };

  return (
    <Modal show={isModalActive} onHide={handleCloseModal}>
      {ModalContent && <ModalContent handleCloseModal={handleCloseModal} />}
    </Modal>
  );
};

export default ModalWindow;
