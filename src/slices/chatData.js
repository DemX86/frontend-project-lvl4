import { createSlice } from '@reduxjs/toolkit';

const chatDataSlice = createSlice({
  name: 'chatData',
  initialState: {
    channels: [],
    messages: [],
    currentChannelId: null,
  },
  reducers: {
    setChatData: (state, action) => {
      state.channels = action.payload.channels;
      state.messages = action.payload.messages;
      state.currentChannelId = action.payload.currentChannelId;
    },
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { addMessage, setChatData, setCurrentChannelId } = chatDataSlice.actions;
export default chatDataSlice.reducer;
