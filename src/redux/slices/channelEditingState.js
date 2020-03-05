import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import get from 'lodash/get';
import routes from '../../routes';
import { actions as modalStateActions } from './modalState';
import { actions as channelsActions } from './channels';

const channelEditingState = createSlice({
  name: 'channelEditingState',
  initialState: 'none',
  reducers: {
    editChannelRequest() {
      return 'requested';
    },
    editChannelFailure() {
      return 'failed';
    },
    editChannelSuccess() {
      return 'finished';
    },
  },
});

const {
  editChannelRequest,
  editChannelSuccess,
  editChannelFailure,
} = channelEditingState.actions;

export const updateChannel = (channelId, data, resetFn) => (dispatch) => {
  dispatch(editChannelRequest());

  return axios({
    method: 'PATCH',
    url: `${routes.channelsPath()}/${channelId}`,
    data,
  })
    .then((response) => {
      const channel = get(response, 'data.data.attributes');

      dispatch(editChannelSuccess());

      dispatch(channelsActions.editChannel({ channel }));

      resetFn();

      dispatch(modalStateActions.hideModal());
    })
    .catch(() => {
      dispatch(editChannelFailure({ message: 'Something went wrong during editing the channel. Please try again.' }));
    });
};

const actions = { ...channelEditingState.actions, updateChannel };

export { actions };

export const getChannelEditingState = (state) => state.channelEditingState;

export default channelEditingState.reducer;
