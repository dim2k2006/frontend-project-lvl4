import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import * as actions from '../actions';
import { getUserName as getName } from '../../utils';

const channels = createReducer([], {

});

const channelAddingState = createReducer('none', {
  [actions.addChannelRequest]() {
    return 'requested';
  },
  [actions.addChannelFailure]() {
    return 'failed';
  },
  [actions.addChannelSuccess]() {
    return 'finished';
  },
});

const messages = createReducer([], {
  [actions.submitMessageSuccess](state, action) {
    state.push(action.payload.message);
  },
  [actions.receiveMessage](state, action) {
    state.push(action.payload.message);
  },
});

const userName = createReducer(getName(), {

});

const errorMessage = createReducer('', {
  [actions.submitMessageFailure](state, action) {
    return action.payload.message;
  },
  [actions.resetErrorMessage]() {
    return '';
  },
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

const modalState = createReducer('none', {
  [actions.addChannel]() {
    return 'addingChannel';
  },
  [actions.removeChannel]() {
    return 'removingChannel';
  },
  [actions.editChannel]() {
    return 'editingChannel';
  },
  [actions.resetChannel]() {
    return 'none';
  },
});

export const getChannels = (state) => state.channels;

export const getMessages = (state) => state.messages;

export const getMessagesForChannel = (state, channelId) => state.messages
  .filter((m) => m.channelId === channelId);

export const getActiveChannel = (state) => state.activeChannel;

export const getUserName = (state) => state.userName;

export const getMessageSubmittingState = (state) => state.messageSubmittingState;

export const getErrorMessage = (state) => state.errorMessage;

export const getModalState = (state) => state.modalState;

export default combineReducers({
  channels,
  channelAddingState,
  messages,
  messageSubmittingState,
  userName,
  activeChannel,
  errorMessage,
  modalState,
});
