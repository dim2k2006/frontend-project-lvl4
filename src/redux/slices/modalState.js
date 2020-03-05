import { createSlice } from '@reduxjs/toolkit';

const modalState = createSlice({
  name: 'modalState',
  initialState: 'none',
  reducers: {
    showModal(state, action) {
      return action.payload.type;
    },
    hideModal() {
      return 'none';
    },
  },
});

const actions = { ...modalState.actions };

export { actions };

export const getModalState = (state) => state.modalState;

export default modalState.reducer;
