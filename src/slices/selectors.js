import { createSelector } from '@reduxjs/toolkit';

const outputSelector = (data) => data;

const selectors = {
  channelsSelector: createSelector(
    (state) => state.channelsData,
    outputSelector,
  ),
  messagesSelector: createSelector(
    (state) => state.messagesData,
    outputSelector,
  ),
  modalSelector: createSelector(
    (state) => state.modalData,
    outputSelector,
  ),
};

export default selectors;
