import { createReducer } from '@reduxjs/toolkit';
import * as actions from '../actions';

const errorMessage = createReducer('', {
  [actions.submitMessageFailure](state, action) {
    return action.payload.message;
  },
  [actions.addChannelFailure](state, action) {
    return action.payload.message;
  },
  [actions.resetErrorMessage]() {
    return '';
  },
});

export const getErrorMessage = (state) => state.errorMessage;

export default {
  errorMessage,
};
