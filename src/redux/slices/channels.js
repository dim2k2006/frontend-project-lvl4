import { createSlice } from '@reduxjs/toolkit';
import find from 'lodash/find';

const channels = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannel(state, action) {
      state.push(action.payload.channel);
    },
    removeChannel(state, action) {
      return state.filter((channel) => channel.id !== action.payload.id);
    },
    editChannel(state, action) {
      const channel = find(state, (ch) => ch.id === action.payload.channel.id);

      channel.name = action.payload.channel.name;
    },


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
});

const actions = { ...channels.actions };

export { actions };

export const getChannels = (state) => state.channels;

export default channels.reducer;
