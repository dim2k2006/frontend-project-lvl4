import { createAction } from '@reduxjs/toolkit';

export const receiveMessage = createAction('MESSAGE_RECEIVE');

export const resetErrorMessage = createAction('ERROR_MESSAGE_RESET');

export const receiveChannel = createAction('CHANNEL_RECEIVE');

export const receiveRemovedChannel = createAction('CHANNEL_RECEIVE_REMOVED');

export const receiveEditedChannel = createAction('CHANNEL_RECEIVE_EDITED');
