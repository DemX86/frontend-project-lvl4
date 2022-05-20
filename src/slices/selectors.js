import { createSelector } from '@reduxjs/toolkit';

const selectActiveModalType = (state) => state.modalData.activeModalType;

const selectModalChannelId = (state) => state.modalData.modalChannelId;

const selectChannels = (state) => state.channelsData.channels;

const selectActiveChannelId = (state) => state.channelsData.activeChannelId;

const selectActiveChannel = createSelector(
  [selectChannels, selectActiveChannelId],
  (channels, activeChannelId) => (
    channels.find((channel) => channel.id === activeChannelId)
  ),
);

const selectModalChannel = createSelector(
  [selectChannels, selectModalChannelId],
  (channels, modalChannelId) => (
    channels.find((channel) => channel.id === modalChannelId)
  ),
);

const selectChannelNames = createSelector(
  selectChannels,
  (channels) => channels.map((channel) => channel.name),
);

const selectMessages = (state) => state.messagesData.messages;

const selectActiveChannelMessages = createSelector(
  [selectMessages, selectActiveChannelId],
  (messages, activeChannelId) => (
    messages.filter((message) => message.channelId === activeChannelId)
  ),
);

export default {
  selectActiveModalType,
  selectModalChannelId,
  selectChannels,
  selectActiveChannelId,
  selectActiveChannel,
  selectModalChannel,
  selectChannelNames,
  selectActiveChannelMessages,
};
