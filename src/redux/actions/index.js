import { createAction } from '@reduxjs/toolkit';

export const activateChannel = createAction('CHANNEL_ACTIVATE');

export const submitMessageRequest = createAction('MESSAGE_SUBMIT_REQUEST');
export const submitMessageSuccess = createAction('MESSAGE_SUBMIT_SUCCESS');
export const submitMessageFailure = createAction('MESSAGE_SUBMIT_FAILURE');

export const submitMessage = (data, endpoint, form) => (dispatch) => {
  dispatch(submitMessageRequest());

  // return axios({
  //   method: 'POST',
  //   url: `${host}${endpoint}`,
  //   data,
  //   headers,
  // })
  //   .then(() => {
  //     dispatch(submitMessageSuccess());
  //
  //     // setTimeout(() => {
  //     //   dispatch(reset(form));
  //     //   dispatch(submitCustomerFormReset());
  //     // }, resetDelay);
  //   })
  //   .catch((error) => {
  //     // const status = get(error, 'response.status', 500);
  //     // const errors = get(error, 'response.data.errors', {});
  //     // const errorMessage = keys(errors)
  //     //   .reduce((accumulator, key) => ({
  //     //     ...accumulator,
  //     //     [key]: errors[key].join(', '),
  //     //   }), {});
  //     //
  //     // if (status === 422) {
  //     //   throw new SubmissionError(errorMessage);
  //     // }
  //
  //     dispatch(submitMessageFailure());
  //
  //     // throw error;
  //   });
};
