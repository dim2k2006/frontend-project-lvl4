import { createReducer } from '@reduxjs/toolkit';
import produce from 'immer';
import * as actions from '../actions';

const reducer = createReducer({}, {
  [actions.activateChannel]: produce((draft, action) => {
    draft.activeChannel = action.payload.channel;
  }),
});

export const getChannels = (state) => state.channels;

export default reducer;
