import { createSlice } from '@reduxjs/toolkit';

import { actions as channelActions } from './channelsDataSlice.js';

const messagesDataSlice = createSlice({
  name: 'messagesData',
  initialState: {
    messages: [],
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelActions.removeChannel, (state, action) => {
        const { id: removedChannelId } = action.payload;
        state.messages = state.messages.filter((message) => message.channelId !== removedChannelId);
      });
  },
});

export const { actions } = messagesDataSlice;
export default messagesDataSlice.reducer;
