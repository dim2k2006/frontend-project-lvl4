import { createSlice } from '@reduxjs/toolkit';
import { actions as messageSubmittingStateActions } from './messageSubmittingState';

const messages = createSlice({
  name: 'messages',
  initialState: [],
  reducer: {
    receiveMessage(state, action) {
      state.push(action.payload.message);
    },
  },
  extraReducers: {
    [messageSubmittingStateActions.submitMessageSuccess](state, action) {
      state.push(action.payload.message);
    },
  },
});

const actions = { ...messages.actions };

export { actions };

export const getMessages = (state) => state.messages;

export const getMessagesForChannel = (state, channelId) => state.messages
  .filter((m) => m.channelId === channelId);

export default messages.reducer;
