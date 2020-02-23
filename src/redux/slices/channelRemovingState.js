import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../../routes';
import { actions as modalStateActions } from './modalState';

const channelRemovingState = createSlice({
  name: 'channelRemovingState',
  initialState: 'none',
  reducers: {
    removeChannelRequest() {
      return 'requested';
    },
    removeChannelFailure() {
      return 'failed';
    },
    removeChannelSuccess() {
      return 'finished';
    },
  },
});

const {
  removeChannelRequest,
  removeChannelSuccess,
  removeChannelFailure,
} = channelRemovingState.actions;

export const deleteChannel = (id) => (dispatch) => {
  dispatch(removeChannelRequest());

  return axios({
    method: 'DELETE',
    url: `${routes.channelsPath()}/${id}`,
  })
    .then(() => {
      dispatch(removeChannelSuccess({ id }));

      dispatch(modalStateActions.resetModal());
    })
    .catch(() => {
      dispatch(removeChannelFailure({ message: 'Something went wrong during removing the channel. Please try again.' }));
    });
};

const actions = { ...channelRemovingState.actions, deleteChannel };

export { actions };

export const getChannelRemovingState = (state) => state.channelRemovingState;

export default channelRemovingState.reducer;
