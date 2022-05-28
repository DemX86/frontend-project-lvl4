/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const DEFAULT_CHANNEL_ID = 1;

const fetchInitialDataThunk = createAsyncThunk(
  'fetchInitialData',
  async (api) => api.fetchInitialData(),
);

const channelsDataSlice = createSlice({
  name: 'channelsData',
  initialState: {
    channels: [],
    activeChannelId: null,
    isLoading: false,
    loadingError: null,
  },
  reducers: {
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
    resetInitialLoadingInfo: (state) => {
      state.isLoading = false;
      state.loadingError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialDataThunk.pending, (state) => {
        state.isLoading = true;
        state.loadingError = null;
      })
      .addCase(fetchInitialDataThunk.fulfilled, (state, action) => {
        const { channels, currentChannelId } = action.payload;
        state.channels = channels;
        state.activeChannelId = currentChannelId;
        state.isLoading = false;
        state.loadingError = null;
      })
      .addCase(fetchInitialDataThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.loadingError = action.error;
      });
  },
});

export { fetchInitialDataThunk };
export const { actions: channelActions } = channelsDataSlice;
export default channelsDataSlice.reducer;
