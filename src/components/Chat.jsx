import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col,
  Container,
  Fade,
  Row,
  Spinner,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import Channels from './Chat/Channels.jsx';
import Input from './Chat/Input.jsx';
import Messages from './Chat/Messages.jsx';
import ApiContext from '../contexts/api.js';
import AuthContext from '../contexts/auth.js';
import { channelActions, fetchInitialDataThunk } from '../slices/channelsDataSlice.js';
import routes from '../routes.js';
import selectors from '../slices/selectors.js';

const Chat = () => {
  const api = useContext(ApiContext);
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, loadingError } = useSelector(selectors.selectInitialLoadingInfo);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchInitialDataThunk(api));
  }, []);

  useEffect(() => {
    if (loadingError) {
      if (loadingError.message === 'Request failed with status code 401') {
        auth.logOut();
        navigate(routes.appLoginPath());
      } else {
        console.error(loadingError);
        toast.error(t('errors.connectionError'));
      }
      dispatch(channelActions.resetInitialLoadingInfo({}));
    }
  }, [loadingError]);

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
