import { createReducer } from '@reduxjs/toolkit';
import find from 'lodash/find';
import * as actions from '../actions';
import { getUserName as getName } from '../../utils';

const channels = createReducer([], {
  [actions.addChannelSuccess](state, action) {
    state.push(action.payload.channel);
  },
  [actions.receiveChannel](state, action) {
    state.push(action.payload.channel);
  },
  [actions.removeChannelSuccess](state, action) {
    return state.filter((channel) => channel.id !== action.payload.id);
  },
  [actions.receiveRemovedChannel](state, action) {
    return state.filter((channel) => channel.id !== action.payload.id);
  },
  [actions.editChannelSuccess](state, action) {
    const channel = find(state, (ch) => ch.id === action.payload.channel.id);

    channel.name = action.payload.channel.name;
  },
  [actions.receiveEditedChannel](state, action) {
    const channel = find(state, (ch) => ch.id === action.payload.channel.id);

    channel.name = action.payload.channel.name;
  },
});

const userName = createReducer(getName(), {

});

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

export const getChannels = (state) => state.channels;

export const getUserName = (state) => state.userName;

export const getErrorMessage = (state) => state.errorMessage;

// export default combineReducers({
// //   channels,
// //   channelAddingState,
// //   channelRemovingState,
// //   channelEditingState,
// //   messages,
// //   userName,
// //   activeChannel,
// //   errorMessage,
// //   modalState,
// // });

export default {
  channels,
  userName,
  errorMessage,
};
