import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import get from 'lodash/get';
import routes from '../../routes';
import { actions as channelsActions } from './channels';
import { actions as modalStateActions } from './modalState';
import { actions as errorMessageActions } from './errorMessage';

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

export const createChannel = (data, resetFn) => async (dispatch) => {
  dispatch(addChannelRequest());

  try {
    const response = await axios.post(routes.channelsPath(), data);
    const channel = get(response, 'data.data.attributes');

    dispatch(addChannelSuccess());

    dispatch(channelsActions.addChannel({ channel }));

    resetFn();

    dispatch(modalStateActions.hideModal());
  } catch (e) {
    dispatch(addChannelFailure());

    dispatch(errorMessageActions.showError({ message: 'ADD_CHANNEL' }));
  }
};

const actions = { ...channelAddingState.actions, createChannel };

export { actions };

export const getChannelAddingState = (state) => state.channelAddingState;

export default channelAddingState.reducer;
