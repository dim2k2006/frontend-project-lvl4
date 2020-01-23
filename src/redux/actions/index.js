import axios from 'axios';
import get from 'lodash/get';
import { createAction } from '@reduxjs/toolkit';
import routes from '../../routes';

export const activateChannel = createAction('CHANNEL_ACTIVATE');

export const submitMessageRequest = createAction('MESSAGE_SUBMIT_REQUEST');
export const submitMessageSuccess = createAction('MESSAGE_SUBMIT_SUCCESS');
export const submitMessageFailure = createAction('MESSAGE_SUBMIT_FAILURE');

export const submitMessage = (channelId, data, resetFn) => (dispatch) => {
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

export const resetErrorMessage = createAction('ERROR_MESSAGE_RESET');
