import axios from 'axios';
import get from 'lodash/get';
import { createAction } from '@reduxjs/toolkit';
import routes from '../../routes';

export const activateChannel = createAction('CHANNEL_ACTIVATE');

export const receiveMessage = createAction('MESSAGE_RECEIVE');

export const resetErrorMessage = createAction('ERROR_MESSAGE_RESET');

export const receiveChannel = createAction('CHANNEL_RECEIVE');

export const removeChannelRequest = createAction('CHANNEL_REMOVE_REQUEST');
export const removeChannelSuccess = createAction('CHANNEL_REMOVE_SUCCESS');
export const removeChannelFailure = createAction('CHANNEL_REMOVE_FAILURE');

export const deleteChannel = (id) => (dispatch) => {
  dispatch(removeChannelRequest());

  return axios({
    method: 'DELETE',
    url: `${routes.channelsPath()}/${id}`,
  })
    .then(() => {
      dispatch(removeChannelSuccess({ id }));

      dispatch(resetModal());
    })
    .catch(() => {
      dispatch(removeChannelFailure({ message: 'Something went wrong during removing the channel. Please try again.' }));
    });
};

export const receiveRemovedChannel = createAction('CHANNEL_RECEIVE_REMOVED');

export const editChannelRequest = createAction('CHANNEL_EDIT_REQUEST');
export const editChannelSuccess = createAction('CHANNEL_EDIT_SUCCESS');
export const editChannelFailure = createAction('CHANNEL_EDIT_FAILURE');

export const updateChannel = (channelId, data, resetFn) => (dispatch) => {
  dispatch(editChannelRequest());

  return axios({
    method: 'PATCH',
    url: `${routes.channelsPath()}/${channelId}`,
    data,
  })
    .then((response) => {
      const channel = get(response, 'data.data.attributes');

      dispatch(editChannelSuccess({ channel }));

      resetFn();

      dispatch(resetModal());
    })
    .catch(() => {
      dispatch(editChannelFailure({ message: 'Something went wrong during editing the channel. Please try again.' }));
    });
};

export const receiveEditedChannel = createAction('CHANNEL_RECEIVE_EDITED');
