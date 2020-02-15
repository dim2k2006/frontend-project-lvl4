import { createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

const messages = createSlice({
  name: 'messages',
  initialState: [],
  reducer: {
    submitMessageSuccess(state, action) {
      state.push(action.payload.message);
    },
    receiveMessage(state, action) {
      state.push(action.payload.message);
    },
  },
});

const actions = { ...messages.actions };

export { actions };

export default combineReducers({
  messages: messages.reducer,
});
