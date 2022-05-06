import { createSlice } from '@reduxjs/toolkit';

import { actions as channelActions } from './channelsDataSlice.js';

const messagesDataSlice = createSlice({
  name: 'messagesData',
  initialState: {
    messages: [],
  },
  reducers: {
    setMessages: (state, action) => ({
      messages: action.payload,
    }),
    addMessage: (state, action) => ({
      messages: [...state.messages, action.payload],
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelActions.removeChannel, (state, action) => {
        const { id } = action.payload;
        return {
          messages: state.messages.filter((message) => message.channelId !== id),
        };
      });
  },
});

export const { actions } = messagesDataSlice;
export default messagesDataSlice.reducer;
