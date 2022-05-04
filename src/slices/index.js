import { configureStore } from '@reduxjs/toolkit';
import chatDataReducer from './chatData.js';

const store = configureStore({
  reducer: {
    chatData: chatDataReducer,
  },
});

export default store;
