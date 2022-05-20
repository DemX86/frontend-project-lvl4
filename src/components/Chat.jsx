import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import ApiContext from '../contexts/api.js';
import { channelActions } from '../slices/channelsDataSlice.js';
import { modalActions } from '../slices/modalDataSlice.js';
import Channels from './Chat/Channels.jsx';
import Input from './Chat/Input.jsx';
import Messages from './Chat/Messages.jsx';
import getModal from './modals/getModal.js';
import selectors from '../slices/selectors.js';

const Chat = () => {
  const api = useContext(ApiContext);
  const dispatch = useDispatch();
  const activeModalType = useSelector(selectors.selectActiveModalType);
  const { t } = useTranslation('translation', { keyPrefix: 'chatPage' });

  useEffect(() => {
    const fetch = async () => {
      const initialData = await api.fetchInitialData();
      dispatch(channelActions.setChannels(initialData));
    };
    fetch()
      .catch((error) => {
        console.error(error);
        toast.error(t('errors.connectionError'));
      });
  }, []);

  const handleCloseModal = () => {
    dispatch(modalActions.setModalData({
      activeModalType: null,
      modalChannelId: null,
    }));
  };

  return (
    <>
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100">
          <Channels />
          <Col className="bg-white h-100 p-0">
            <div className="d-flex flex-column h-100">
              <Messages />
              <Input />
            </div>
          </Col>
        </Row>
      </Container>
      {activeModalType
        ? React.createElement(getModal(activeModalType), { handleCloseModal })
        : null}
    </>
  );
};

export default Chat;
