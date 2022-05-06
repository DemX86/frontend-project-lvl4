import { createSlice } from '@reduxjs/toolkit';

const modalDataSlice = createSlice({
  name: 'modalData',
  initialState: {
    activeModalType: null,
    modalChannelId: null,
  },
  reducers: {
    setModalData: (state, action) => {
      const {
        activeModalType,
        modalChannelId,
      } = action.payload;
      return {
        activeModalType,
        modalChannelId,
      };
    },
  },
});

export const { actions } = modalDataSlice;
export default modalDataSlice.reducer;
