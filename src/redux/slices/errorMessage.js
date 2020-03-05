import { createSlice } from '@reduxjs/toolkit';
import { actions as messageSubmittingStateActions } from './messageSubmittingState';

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
  extraReducers: {
    [messageSubmittingStateActions.submitMessageFailure](state, action) {
      return action.payload.message;
    },
  },
});

const actions = { ...errorMessage.actions };

export { actions };

export const getErrorMessage = (state) => state.errorMessage;

export default errorMessage.reducer;
