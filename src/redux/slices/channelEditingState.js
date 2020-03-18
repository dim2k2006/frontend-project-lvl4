import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import get from 'lodash/get';
import routes from '../../routes';
import { actions as modalStateActions } from './modalState';
import { actions as channelsActions } from './channels';
import { actions as errorMessageActions } from './errorMessage';

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

export const updateChannel = (channelId, data, resetFn) => async (dispatch) => {
  dispatch(editChannelRequest());

  try {
    const response = await axios.patch(`${routes.channelsPath()}/${channelId}`, data);
    const channel = get(response, 'data.data.attributes');

    dispatch(editChannelSuccess());

    dispatch(channelsActions.editChannel({ channel }));

    resetFn();

    dispatch(modalStateActions.hideModal());
  } catch (e) {
    dispatch(editChannelFailure());

    dispatch(errorMessageActions.showError({ message: 'EDIT_CHANNEL' }));
  }
};

const actions = { ...channelEditingState.actions, updateChannel };

export { actions };

export const getChannelEditingState = (state) => state.channelEditingState;

export default channelEditingState.reducer;
