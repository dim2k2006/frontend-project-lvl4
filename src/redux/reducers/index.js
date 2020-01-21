import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import * as actions from '../actions';
import { getUserName as getName } from '../../utils';

const channels = createReducer([], {

});

const messages = createReducer([], {
  [actions.submitMessageSuccess](state, action) {
    state.push(action.payload.message);
  },
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

export const getMessages = (state) => state.messages;

export const getMessagesForChannel = (state, channelId) => state.messages
  .filter((m) => m.channelId === channelId);

export const getActiveChannel = (state) => state.activeChannel;

export const getUserName = (state) => state.userName;

export const getMessageSubmittingState = (state) => state.messageSubmittingState;

export default combineReducers({
  channels,
  messages,
  userName,
  messageSubmittingState,
  activeChannel,
});
