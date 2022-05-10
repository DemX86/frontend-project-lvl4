import { configureStore } from '@reduxjs/toolkit';

import channelsDataReducer from './channelsDataSlice.js';
import messagesDataReducer from './messagesDataSlice.js';
import modalDataReducer from './modalDataSlice.js';

const store = configureStore({
  reducer: {
    channelsData: channelsDataReducer,
    messagesData: messagesDataReducer,
    modalData: modalDataReducer,
  },
});

export default store;
