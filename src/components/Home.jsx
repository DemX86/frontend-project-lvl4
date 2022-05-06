import axios from 'axios';
import React, { useContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  Form,
  InputGroup,
  Nav,
  Row,
  Stack,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';

import { actions as channelActions } from '../slices/channelsDataSlice.js';
import { actions as messageActions } from '../slices/messagesDataSlice.js';
import { actions as modalActions } from '../slices/modalDataSlice.js';
import routes from '../routes.js';
import SocketContext from '../contexts/socket.js';
import getModal from './modals/getModal.js';

filter.loadDictionary('ru');
filter.add(filter.getDictionary('en'));

const Home = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'homePage' });

  const dispatch = useDispatch();
  const inputRef = useRef();
  const socket = useContext(SocketContext);

  const user = JSON.parse(localStorage.getItem('user'));
  const ax = axios.create();
  ax.defaults.headers.common.Authorization = `Bearer ${user.token}`;

  const { channels, activeChannelId } = useSelector((state) => state.channelsData);
  const { messages } = useSelector((state) => state.messagesData);
  const { activeModalType } = useSelector((state) => state.modalData);
  const activeChannelMessages = messages.filter((message) => message.channelId === activeChannelId);

  useEffect(() => {
    inputRef.current.focus();
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
        toast.error(t('loadingErrorToast'));
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      messageBody: '',
    },
    onSubmit: (values, { resetForm }) => {
      const message = {
        body: filter.clean(values.messageBody),
        channelId: activeChannelId,
        username: user.username,
      };
      socket.emit('newMessage', message);
      resetForm();
    },
  });

  const handleSwitchChannel = (channelId) => () => {
    dispatch(channelActions.setActiveChannelId(channelId));
    inputRef.current.focus();
  };

  const handleShowModal = (modalType, channelId = null) => () => {
    dispatch(modalActions.setModalData({
      activeModalType: modalType,
      modalChannelId: channelId,
    }));
  };

  const handleCloseModal = () => {
    dispatch(modalActions.setModalData({
      activeModalType: null,
      modalChannelId: null,
    }));
  };

  const renderChannels = () => {
    const renderButton = (channel) => (
      <Button
        active={channel.id === activeChannelId}
        className="w-100 border-0 rounded-0 text-start text-truncate"
        key={channel.id}
        onClick={handleSwitchChannel(channel.id)}
        variant="outline-secondary"
      >
        {channel.name}
      </Button>
    );

    return (
      <Nav className="flex-column" variant="pills">
        {channels.map((channel) => {
          if (channel.removable) {
            return (
              <Nav.Item className="w-100" key={channel.id}>
                <Dropdown as={ButtonGroup} className="w-100">
                  {renderButton(channel)}
                  <Dropdown.Toggle
                    className="border-0 rounded-0"
                    split
                    variant="outline-secondary"
                  />
                  <Dropdown.Menu>
                    <Dropdown.Item
                      as={Button}
                      onClick={handleShowModal('renameChannel', channel.id)}
                    >
                      Переименовать
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={Button}
                      onClick={handleShowModal('removeChannel', channel.id)}
                    >
                      Удалить
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav.Item>
            );
          }
          return (
            <Nav.Item className="w-100" key={channel.id}>
              {renderButton(channel)}
            </Nav.Item>
          );
        })}
      </Nav>
    );
  };

  const renderChannelInfo = () => {
    const currentChannel = channels.find((channel) => channel.id === activeChannelId);
    if (!currentChannel) {
      return null;
    }
    return (
      <div className="bg-light mb-3 px-4 py-2 shadow-sm">
        <p className="m-0">{currentChannel.name}</p>
        <span className="small text-muted">
          {t('messagesCount.key', { count: activeChannelMessages.length })}
        </span>
      </div>
    );
  };

  const renderMessages = () => {
    if (activeChannelMessages.length === 0) {
      return (
        <div className="h-100 d-flex align-items-center justify-content-center">
          <span className="small text-muted">В этом чате пока нет сообщений</span>
        </div>
      );
    }
    return (
      activeChannelMessages.map((message) => (
        <div className="mb-1 text-break" key={message.id}>
          <strong>
            {message.username}
            :&nbsp;
          </strong>
          {message.body}
        </div>
      ))
    );
  };

  return (
    <>
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100">
          <Col className="border-end" md={2}>
            <Stack className="mt-3 mb-2" direction="horizontal">
              <span className="ms-1 mb-0"><strong>{t('channels')}</strong></span>
              <Button
                className="ms-auto"
                onClick={handleShowModal('addChannel')}
                size="sm"
                variant="outline-success"
              >
                +
              </Button>
            </Stack>
            {renderChannels()}
          </Col>

          <Col className="bg-white h-100 p-0">
            <div className="d-flex flex-column h-100">
              {renderChannelInfo()}

              <div className="h-100 overflow-auto px-4">
                {renderMessages()}
              </div>

              <div className="mt-auto p-4">
                <Form onSubmit={formik.handleSubmit}>
                  <InputGroup>
                    <Form.Control
                      autoComplete="off"
                      id="messageBody"
                      name="messageBody"
                      placeholder={t('placeholder')}
                      ref={inputRef}
                      onChange={formik.handleChange}
                      value={formik.values.messageBody}
                    />
                    <Button
                      disabled={formik.isSubmitting || !formik.dirty}
                      type="submit"
                    >
                      {t('send')}
                    </Button>
                  </InputGroup>
                </Form>
              </div>
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

export default Home;

// todo скроллить вниз при добавлении нового сообщения
// todo разнести на разные компоненты/файлы
