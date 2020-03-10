import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { getUserName } from '../../redux/slices/userName';
import { getMessageSubmittingState } from '../../redux/slices/messageSubmittingState';
import { getActiveChannel } from '../../redux/slices/activeChannel';
import connect from '../../connect';

const MessageForm = ({ submitMessage }) => {
  const userName = useSelector(getUserName);
  const activeChannel = useSelector(getActiveChannel);
  const submittingState = useSelector(getMessageSubmittingState);
  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit: (values, { resetForm }) => {
      const text = get(values, 'message');
      const data = {
        data: {
          attributes: {
            text,
            author: userName,
          },
        },
      };

      submitMessage(activeChannel, data, resetForm);
    },
  });

  const onKeyDown = (event) => {
    const message = get(formik, 'values.message', '');

    if (!message.length || event.keyCode !== 13) return;

    event.preventDefault();

    formik.handleSubmit();
  };

  return (
    <div
      role="presentation"
      onKeyDown={onKeyDown}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="w-100 p-3 position-relative"
      >
        <textarea
          name="message"
          className="form-control w-100"
          placeholder="Enter Your Message"
          value={formik.values.message}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={submittingState === 'requested'}
        />

        {submittingState === 'requested' && (
          <div className="fixed-top position-absolute w-100 h-100 d-flex align-items-center justify-content-center">
            <div
              className="spinner-border text-info"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

MessageForm.propTypes = {
  submitMessage: PropTypes.func.isRequired,
};

export default connect()(MessageForm);
