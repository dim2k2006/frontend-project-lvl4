import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
// import produce from 'immer';
import * as actions from '../actions';
import { getUserName as getName } from '../../utils';

const channels = createReducer([], {

});

const messages = createReducer([], {

});

const userName = createReducer(getName(), {

});

const messageSubmittingState = createReducer('none', {
  [actions.submitMessageRequest]() {
    return 'requested';
  },
  [actions.submitMessageFailure]() {
    return 'failed';
  },
  [actions.submitMessageSuccess]() {
    return 'finished';
  },
});

const activeChannel = createReducer(0, {
  [actions.activateChannel](state, action) {
    return action.payload.channel;
  },
});

export const getChannels = (state) => state.channels;

export const getActiveChannel = (state) => state.activeChannel;

export const getUserName = (state) => state.userName;

export default combineReducers({
  channels,
  messages,
  userName,
  messageSubmittingState,
  activeChannel,
});
