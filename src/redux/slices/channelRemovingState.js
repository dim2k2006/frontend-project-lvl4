import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../../routes';
import i18n from '../../i18n';
import { actions as modalStateActions } from './modalState';
import { actions as channelsActions } from './channels';
import { actions as errorMessageActions } from './errorMessage';

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

export const deleteChannel = (id) => async (dispatch) => {
  dispatch(removeChannelRequest());

  try {
    await axios.delete(`${routes.channelsPath()}/${id}`);

    dispatch(removeChannelSuccess());

    dispatch(channelsActions.removeChannel({ id }));

    dispatch(modalStateActions.hideModal());
  } catch (e) {
    dispatch(removeChannelFailure());

    dispatch(errorMessageActions.showError({ message: i18n.t('REMOVE_CHANNEL') }));
  }
};

const actions = { ...channelRemovingState.actions, deleteChannel };

export { actions };

export const getChannelRemovingState = (state) => state.channelRemovingState;

export default channelRemovingState.reducer;
