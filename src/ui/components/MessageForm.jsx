import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import curry from 'lodash/curry';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import { getUserName } from '../../redux/slices/userName';
import { getMessageSubmittingState } from '../../redux/slices/messageSubmittingState';
import { getActiveChannel } from '../../redux/slices/activeChannel';
import connect from '../../connect';

const MessageForm = ({ submitMessage }) => {
  const userName = useSelector(getUserName);
  const activeChannel = useSelector(getActiveChannel);
  const submittingState = useSelector(getMessageSubmittingState);
  const onSubmit = (values, { resetForm }) => {
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
  };
  const onKeyDown = curry((props, event) => {
    const message = get(props, 'values.message', '');

    if (!message.length || event.keyCode !== 13) return;

    event.preventDefault();

    props.handleSubmit();
  });

  return (
    <Formik
      initialValues={{ message: '' }}
      onSubmit={onSubmit}
    >
      {(props) => (
        <div
          role="presentation"
          onKeyDown={onKeyDown(props)}
        >
          <form
            onSubmit={props.handleSubmit}
            className="w-100 p-3 position-relative"
          >
            <textarea
              name="message"
              className="form-control w-100"
              placeholder="Enter Your Message"
              value={props.values.message}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
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
      )}
    </Formik>
  );
};

MessageForm.propTypes = {
  submitMessage: PropTypes.func.isRequired,
};

export default connect()(MessageForm);
