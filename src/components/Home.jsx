import React, { useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Button, Col, Container, Form, InputGroup, ListGroup, Row } from 'react-bootstrap';

import * as actions from '../slices/chatData.js';
import routes from '../routes.js';
import SocketContext from '../contexts/socket.js';

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const ax = axios.create();
  ax.defaults.headers.common.Authorization = `Bearer ${user.token}`;

  const inputRef = useRef();
  const dispatch = useDispatch();

  const socket = useContext(SocketContext);

  const { channels, messages, currentChannelId } = useSelector((state) => state.chatData);
  const channelMessages = messages.filter((message) => message.channelId === currentChannelId);

  useEffect(() => {
    const fetch = async () => {
      const url = routes.dataPath();
      const response = await ax.get(url);
      dispatch(actions.setChatData(response.data));
    };
    fetch()
      .catch(console.error);
  }, []);

  const formik = useFormik({
    initialValues: {
      messageBody: '',
    },
    onSubmit: (values, { resetForm }) => {
      const message = {
        body: values.messageBody,
        channelId: currentChannelId,
        username: user.username,
      };
      socket.emit('newMessage', message);
      resetForm();
    },
  });

  const renderChannelInfo = () => {
    const currentChannel = channels.find((channel) => channel.id === currentChannelId);
    if (!currentChannel) {
      return null;
    }
    return (
      <div className="bg-light mb-3 px-4 py-2 shadow-sm">
        <p className="m-0">{currentChannel.name}</p>
        <span className="small text-muted">
          Сообщений:&nbsp;
          {channelMessages.length}
        </span>
      </div>
    );
    // todo множественные числа
  };

  const renderMessages = () => {
    if (channelMessages.length === 0) {
      return (
        <div className="h-100 d-flex align-items-center justify-content-center">
          <span className="small text-muted">В этом чате пока нет сообщений</span>
        </div>
      );
    }
    return (
      channelMessages.map((message) => (
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

  const handleSwitchChannel = (channelId) => () => {
    dispatch(actions.setCurrentChannelId(channelId));
    inputRef.current.focus();
  };

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100">
        <Col className="border-end" md={2}>
          <div className="mt-3 text-center">
            <h6>Каналы</h6>
          </div>
          <ListGroup>
            {channels.map((channel) => (
              <ListGroup.Item
                action
                active={channel.id === currentChannelId}
                className="py-2"
                key={channel.id}
                onClick={handleSwitchChannel(channel.id)}
              >
                {channel.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col className="bg-white p-0">
          <div className="d-flex flex-column h-100">
            {renderChannelInfo()}

            <div className="h-100 px-4">
              {renderMessages()}
            </div>

            <div className="mt-auto p-4">
              <Form onSubmit={formik.handleSubmit}>
                <InputGroup>
                  <Form.Control
                    autoComplete="off"
                    autoFocus
                    id="messageBody"
                    name="messageBody"
                    placeholder="Введите сообщение…"
                    ref={inputRef}
                    onChange={formik.handleChange}
                    value={formik.values.messageBody}
                  />
                  <Button
                    disabled={formik.isSubmitting || !formik.dirty}
                    type="submit"
                  >
                    Отправить
                  </Button>
                </InputGroup>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
