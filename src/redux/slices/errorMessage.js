import { createSlice } from '@reduxjs/toolkit';

const errorMessage = createSlice({
  name: 'errorMessage',
  initialState: '',
  reducers: {
    showError(state, action) {
      return action.payload.message;
    },
    hideError() {
      return '';
    },
  },
});

const actions = { ...errorMessage.actions };

export { actions };

export const getErrorMessage = (state) => state.errorMessage;

export default errorMessage.reducer;
