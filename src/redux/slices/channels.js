import { createSlice } from '@reduxjs/toolkit';
import find from 'lodash/find';
import { actions as channelAddingStateActions } from './channelAddingState';
import { actions as channelRemovingStateActions } from './channelRemovingState';
import { actions as channelEditingStateActions } from './channelEditingState';

const channels = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    receiveChannel(state, action) {
      state.push(action.payload.channel);
    },
    receiveRemovedChannel(state, action) {
      return state.filter((channel) => channel.id !== action.payload.id);
    },
    receiveEditedChannel(state, action) {
      const channel = find(state, (ch) => ch.id === action.payload.channel.id);

      channel.name = action.payload.channel.name;
    },
  },
  extraReducers: {
    [channelAddingStateActions.addChannelSuccess](state, action) {
      state.push(action.payload.channel);
    },
    [channelRemovingStateActions.removeChannelSuccess](state, action) {
      return state.filter((channel) => channel.id !== action.payload.id);
    },
    [channelEditingStateActions.editChannelSuccess](state, action) {
      const channel = find(state, (ch) => ch.id === action.payload.channel.id);

      channel.name = action.payload.channel.name;
    },
  },
});

const actions = { ...channels.actions };

export { actions };

export const getChannels = (state) => state.channels;

export default channels.reducer;
