import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import get from 'lodash/get';
import routes from '../../routes';
import { actions as modalStateActions } from './modalState';

const channelAddingState = createSlice({
  name: 'channelAddingState',
  initialState: 'none',
  reducers: {
    addChannelRequest() {
      return 'requested';
    },
    addChannelFailure() {
      return 'failed';
    },
    addChannelSuccess() {
      return 'finished';
    },
  },
});

const {
  addChannelRequest,
  addChannelSuccess,
  addChannelFailure,
} = channelAddingState.actions;

export const createChannel = (data, resetFn) => (dispatch) => {
  dispatch(addChannelRequest());

  return axios({
    method: 'POST',
    url: routes.channelsPath(),
    data,
  })
    .then((response) => {
      const channel = get(response, 'data.data.attributes');

      dispatch(addChannelSuccess({ channel }));

      resetFn();

      dispatch(modalStateActions.resetModal());
    })
    .catch(() => {
      dispatch(addChannelFailure({ message: 'Something went wrong during creating the channel. Please try again.' }));
    });
};

const actions = { ...channelAddingState.actions, createChannel };

export { actions };

export const getChannelAddingState = (state) => state.channelAddingState;

export default channelAddingState.reducer;
