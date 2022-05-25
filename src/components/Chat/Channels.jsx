import React from 'react';
import {
  Button,
  ButtonGroup,
  Col,
  Dropdown,
  Nav,
  Stack,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { channelActions } from '../../slices/channelsDataSlice.js';
import { modalActions } from '../../slices/modalDataSlice.js';
import selectors from '../../slices/selectors.js';

const Channels = () => {
  const dispatch = useDispatch();
  const channels = useSelector(selectors.selectChannels);
  const activeChannelId = useSelector(selectors.selectActiveChannelId);
  const { t } = useTranslation();

  const handleSwitchChannel = (channelId) => () => {
    dispatch(channelActions.setActiveChannelId(channelId));
  };

  const handleShowModal = (modalType, modalChannelId = null) => () => {
    dispatch(modalActions.showModal({
      modalType,
      modalChannelId,
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
        <span className="ms-1 mb-0"><strong>{t('chatPage.channels')}</strong></span>
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
                    <span className="visually-hidden">{t('chatPage.channelControl')}</span>
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
