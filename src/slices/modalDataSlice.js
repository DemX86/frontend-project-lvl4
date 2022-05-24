/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const modalDataSlice = createSlice({
  name: 'modalData',
  initialState: {
    isActive: false,
    modalType: null,
    modalChannelId: null,
  },
  reducers: {
    showModal: (state, action) => {
      const { modalType, modalChannelId } = action.payload;
      state.isActive = true;
      state.modalType = modalType;
      state.modalChannelId = modalChannelId;
    },
    hideModal: (state) => {
      state.isActive = false;
      state.modalType = null;
      state.modalChannelId = null;
    },
  },
});

export const { actions: modalActions } = modalDataSlice;
export default modalDataSlice.reducer;
