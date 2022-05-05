import { createSlice } from '@reduxjs/toolkit';

const channelsDataSlice = createSlice({
  name: 'channelsData',
  initialState: {
    channels: [],
    activeChannelId: null,
  },
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload;
    },
    setActiveChannelId: (state, action) => {
      state.activeChannelId = action.payload;
    },
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      const channelToRename = state.channels.find((channel) => channel.id === id);
      channelToRename.name = name;
    },
    removeChannel: (state, action) => {
      const { id } = action.payload;
      state.channels = state.channels.filter((channel) => channel.id !== id);
    },
  },
});

export const { actions } = channelsDataSlice;
export default channelsDataSlice.reducer;
