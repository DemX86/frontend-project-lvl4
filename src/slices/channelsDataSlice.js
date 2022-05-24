/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_CHANNEL_ID = 1;

const channelsDataSlice = createSlice({
  name: 'channelsData',
  initialState: {
    channels: [],
    activeChannelId: null,
  },
  reducers: {
    setChannels: (state, action) => {
      const { channels, currentChannelId } = action.payload;
      state.channels = channels;
      state.activeChannelId = currentChannelId;
    },
    addChannel: (state, action) => {
      const newChannel = action.payload;
      state.activeChannelId = newChannel.id;
      state.channels.push(newChannel);
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      const channelToRename = state.channels.find((channel) => channel.id === id);
      channelToRename.name = name;
    },
    removeChannel: (state, action) => {
      const { id } = action.payload;
      state.channels = state.channels.filter((channel) => channel.id !== id);
      state.activeChannelId = DEFAULT_CHANNEL_ID;
    },
    setActiveChannelId: (state, action) => {
      state.activeChannelId = action.payload;
    },
  },
});

export const { actions: channelActions } = channelsDataSlice;
export default channelsDataSlice.reducer;
