import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Col,
  Container,
  Fade,
  Row,
  Spinner,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import ApiContext from '../contexts/api.js';
import { channelActions } from '../slices/channelsDataSlice.js';

import Channels from './Chat/Channels.jsx';
import Input from './Chat/Input.jsx';
import Messages from './Chat/Messages.jsx';

const Chat = () => {
  const [isLoading, setLoading] = useState(false);

  const api = useContext(ApiContext);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const fetch = async () => {
      const initialData = await api.fetchInitialData();
      dispatch(channelActions.setInitialData(initialData));
      setLoading(false);
    };
    setLoading(true);
    fetch()
      .catch((error) => {
        console.error(error);
        toast.error(t('errors.connectionError'));
      });
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <Fade appear in>
          <div className="h-100 d-flex align-items-center justify-content-center">
            <Spinner animation="border" variant="primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </Fade>
      );
    }
    return (
      <div className="d-flex flex-column h-100">
        <Messages />
        <Input />
      </div>
    );
  };

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100">
        <Channels />
        <Col className="bg-white h-100 p-0">
          {renderContent()}
        </Col>
      </Row>

    </Container>
  );
};

export default Chat;
