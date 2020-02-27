import { createSlice } from '@reduxjs/toolkit';

const activeChannel = createSlice({
  name: 'activeChannel',
  initialState: 0,
  reducers: {
    activateChannel(state, action) {
      return action.payload.channel;
    },
  },
});

const actions = { ...activeChannel.actions };

export { actions };

export const getActiveChannel = (state) => state.activeChannel;

export default activeChannel.reducer;
