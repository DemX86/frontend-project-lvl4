/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

import { channelActions } from './channelsDataSlice.js';

const messagesDataSlice = createSlice({
  name: 'messagesData',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelActions.setInitialData, (state, action) => {
        const { messages } = action.payload;
        state.messages = messages;
      })
      .addCase(channelActions.removeChannel, (state, action) => {
        const { id } = action.payload;
        state.messages = state.messages.filter((message) => message.channelId !== id);
      });
  },
});

export const { actions: messageActions } = messagesDataSlice;
export default messagesDataSlice.reducer;
