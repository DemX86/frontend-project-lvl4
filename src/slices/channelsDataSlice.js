import { createSlice } from '@reduxjs/toolkit';

const channelsDataSlice = createSlice({
  name: 'channelsData',
  initialState: {
    channels: [],
    activeChannelId: null,
  },
  reducers: {
    setChannels: (state, action) => ({
      ...state,
      channels: action.payload,
    }),
    setActiveChannelId: (state, action) => ({
      ...state,
      activeChannelId: action.payload,
    }),
    addChannel: (state, action) => ({
      ...state,
      channels: [...state.channels, action.payload],
    }),
    renameChannel: (state, action) => {
      const renamedChannel = action.payload;
      const channels = state.channels.map((channel) => {
        if (channel.id === renamedChannel.id) {
          return renamedChannel;
        }
        return channel;
      });
      return {
        ...state,
        channels,
      };
    },
    removeChannel: (state, action) => {
      const { id } = action.payload;
      return {
        ...state,
        channels: state.channels.filter((channel) => channel.id !== id),
      };
    },
  },
});

export const { actions } = channelsDataSlice;
export default channelsDataSlice.reducer;
