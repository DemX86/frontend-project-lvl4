import React from 'react';
import {
  Button,
  ButtonGroup,
  Col,
  Dropdown,
  Nav,
  Stack,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { actions as channelActions } from '../../slices/channelsDataSlice.js';
import { actions as modalActions } from '../../slices/modalDataSlice.js';

const Channels = ({ props }) => {
  const { activeChannelId, channels, t } = props;
  const dispatch = useDispatch();

  const handleSwitchChannel = (channelId) => () => {
    dispatch(channelActions.setActiveChannelId(channelId));
  };

  const handleShowModal = (modalType, channelId = null) => () => {
    dispatch(modalActions.setModalData({
      activeModalType: modalType,
      modalChannelId: channelId,
    }));
  };

  const renderChannelCommonButton = (channel) => (
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

      <Nav className="flex-column" variant="pills">
        {channels.map((channel) => {
          if (channel.removable) {
            return (
              <Nav.Item className="w-100" key={channel.id}>
                <Dropdown as={ButtonGroup} className="w-100">
                  {renderChannelCommonButton(channel)}
                  <Dropdown.Toggle
                    className="border-0 rounded-0"
                    split
                    variant="outline-secondary"
                  >
                    <span className="visually-hidden">{t('channelControl')}</span>
                  </Dropdown.Toggle>
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
              {renderChannelCommonButton(channel)}
            </Nav.Item>
          );
        })}
      </Nav>
    </Col>
  );
};

export default Channels;
