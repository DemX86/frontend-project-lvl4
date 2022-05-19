import { createSlice } from '@reduxjs/toolkit';

import { channelActions } from './channelsDataSlice.js';

const messagesDataSlice = createSlice({
  name: 'messagesData',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => ({
      messages: [...state.messages, action.payload],
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelActions.setChannels, (state, action) => {
        const { messages } = action.payload;
        return { messages };
      })
      .addCase(channelActions.removeChannel, (state, action) => {
        const { id } = action.payload;
        return {
          messages: state.messages.filter((message) => message.channelId !== id),
        };
      });
  },
});

export const { actions: messageActions } = messagesDataSlice;
export default messagesDataSlice.reducer;
