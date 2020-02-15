import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import get from 'lodash/get';
import { useDispatch } from 'react-redux';
import routes from '../../routes';

const messageSubmittingState = createSlice({
  name: 'messageSubmittingState',
  initialState: 'none',
  reducer: {
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

const actions = { ...messageSubmittingState.actions };

const submitMessage = (channelId, data, resetFn) => {
  const dispatch = useDispatch();

  dispatch(submitMessageRequest());

  return axios({
    method: 'POST',
    url: routes.channelMessagesPath(channelId),
    data,
  })
    .then((response) => {
      const message = get(response, 'data.data.attributes');

      dispatch(submitMessageSuccess({ message }));

      resetFn();
    })
    .catch(() => {
      dispatch(submitMessageFailure({ message: 'Something went wrong during sending the message. Please try again.' }));
    });
};

export { actions, submitMessage };

export default messageSubmittingState.redcuer;
