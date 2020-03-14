import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import get from 'lodash/get';
import routes from '../../routes';
import i18n from '../../i18n';
import { actions as messagesActions } from './messages';
import { actions as errorMessageActions } from './errorMessage';

const messageSubmittingState = createSlice({
  name: 'messageSubmittingState',
  initialState: 'none',
  reducers: {
    submitMessageRequest() {
      return 'requested';
    },
    submitMessageFailure() {
      return 'failed';
    },
    submitMessageSuccess() {
      return 'finished';
    },
  },
});

const {
  submitMessageRequest,
  submitMessageSuccess,
  submitMessageFailure,
} = messageSubmittingState.actions;

const submitMessage = (channelId, data, resetFn) => async (dispatch) => {
  dispatch(submitMessageRequest());

  try {
    const response = await axios.post(routes.channelMessagesPath(channelId), data);

    const message = get(response, 'data.data.attributes');

    dispatch(submitMessageSuccess());

    dispatch(messagesActions.addMessage({ message }));

    resetFn();
  } catch (e) {
    dispatch(submitMessageFailure());

    dispatch(errorMessageActions.showError({ message: i18n.t('SUBMIT_MESSAGE') }));
  }
};

const actions = { ...messageSubmittingState.actions, submitMessage };

export { actions };

export const getMessageSubmittingState = (state) => state.messageSubmittingState;

export default messageSubmittingState.reducer;
