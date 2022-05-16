import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_CHANNEL_ID = 1;

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
        activeChannelId: DEFAULT_CHANNEL_ID,
        channels: state.channels.filter((channel) => channel.id !== id),
      };
    },
    setActiveChannelId: (state, action) => ({
      ...state,
      activeChannelId: action.payload,
    }),
  },
});

export const { actions } = channelsDataSlice;
export default channelsDataSlice.reducer;
