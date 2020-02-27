import { createSlice } from '@reduxjs/toolkit';
import { actions as messageSubmittingStateActions } from './messageSubmittingState';
import { actions as channelAddingStateActions } from './channelAddingState';

const errorMessage = createSlice({
  name: 'errorMessage',
  initialState: '',
  reducers: {
    resetErrorMessage() {
      return '';
    },
  },
  extraReducers: {
    [messageSubmittingStateActions.submitMessageFailure](state, action) {
      return action.payload.message;
    },
    [channelAddingStateActions.addChannelFailure](state, action) {
      return action.payload.message;
    },
  },
});

const actions = { ...errorMessage.actions };

export { actions };

export const getErrorMessage = (state) => state.errorMessage;

export default errorMessage.reducer;
