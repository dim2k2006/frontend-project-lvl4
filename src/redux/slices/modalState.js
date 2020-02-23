import { createSlice } from '@reduxjs/toolkit';

const modalState = createSlice({
  name: 'modalState',
  initialState: 'none',
  reducers: {
    addChannel() {
      return 'addingChannel';
    },
    removeChannel() {
      return 'removingChannel';
    },
    editChannel() {
      return 'editingChannel';
    },
    resetModal() {
      return 'none';
    },
  },
});

const actions = { ...modalState.actions };

export { actions };

export const getModalState = (state) => state.modalState;

export default modalState.reducer;
