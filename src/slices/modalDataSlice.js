import { createSlice } from '@reduxjs/toolkit';

const modalDataSlice = createSlice({
  name: 'modalData',
  initialState: {
    activeModalType: null,
    modalChannelId: null,
  },
  reducers: {
    setModalData: (state, action) => {
      const { activeModalType, modalChannelId } = action.payload;
      state.activeModalType = activeModalType;
      state.modalChannelId = modalChannelId;
    },
  },
});

export const { actions } = modalDataSlice;
export default modalDataSlice.reducer;
