import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { actions as channelActions } from '../slices/channelsDataSlice.js';
import { actions as messageActions } from '../slices/messagesDataSlice.js';
import { actions as modalActions } from '../slices/modalDataSlice.js';
import routes from '../routes.js';
import Channels from './Chat/Channels.jsx';
import Messages from './Chat/Messages.jsx';
import Input from './Chat/Input.jsx';
import getModal from './modals/getModal.js';

const Chat = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const ax = axios.create();
  ax.defaults.headers.common.Authorization = `Bearer ${user.token}`;

  const dispatch = useDispatch();
  const { activeModalType } = useSelector((state) => state.modalData);
  const { channels, activeChannelId } = useSelector((state) => state.channelsData);
  const { messages } = useSelector((state) => state.messagesData);
  const { t } = useTranslation('translation', { keyPrefix: 'chatPage' });

  useEffect(() => {
    const fetch = async () => {
      const url = routes.dataPath();
      const response = await ax.get(url);
      const initialData = response.data;
      dispatch(channelActions.setChannels(initialData.channels));
      dispatch(channelActions.setActiveChannelId(initialData.currentChannelId));
      dispatch(messageActions.setMessages(initialData.messages));
    };
    fetch()
      .catch((error) => {
        console.error(error);
        toast.error(t('errors.loadingError'));
      });
  }, []);

  const handleCloseModal = () => {
    dispatch(modalActions.setModalData({
      activeModalType: null,
      modalChannelId: null,
    }));
  };

  const props = {
    activeChannelId,
    channels,
    messages,
    t,
    username: user.username,
  };

  return (
    <>
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100">
          <Channels props={props} />
          <Col className="bg-white h-100 p-0">
            <div className="d-flex flex-column h-100">
              <Messages props={props} />
              <Input props={props} />
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
