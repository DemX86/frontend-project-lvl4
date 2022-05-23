import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isActive: false,
  modalType: null,
  modalChannelId: null,
};

const modalDataSlice = createSlice({
  name: 'modalData',
  initialState,
  reducers: {
    showModal: (state, action) => {
      const { modalType, modalChannelId } = action.payload;
      return {
        isActive: true,
        modalType,
        modalChannelId,
      };
    },
    hideModal: () => initialState,
  },
});

export const { actions: modalActions } = modalDataSlice;
export default modalDataSlice.reducer;
