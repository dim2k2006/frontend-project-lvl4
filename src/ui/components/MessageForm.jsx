import React from 'react';
import PropTypes from 'prop-types';
import flow from 'lodash/flow';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as actions from '../../redux/actions';
import { getUserName, getActiveChannel, getMessageSubmittingState } from '../../redux/reducers';

const MessageForm = ({
  userName,
  activeChannel,
  submittingState,
  onSubmit,
}) => (
  <Formik
    initialValues={{ message: '' }}
    onSubmit={onSubmit(userName, activeChannel)}
  >
    {(props) => (
      <div
        role="presentation"
        onKeyDown={(event) => {
          const message = get(props, 'values.message', '');

          if (!message.length || event.keyCode !== 13) return;

          event.preventDefault();

          props.handleSubmit();
        }}
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
            <div
              className="spinner-border text-info position-absolute"
              role="status"
              style={{
                top: '50%',
                left: '50%',
                marginTop: '-16px',
                marginLeft: '-16px',
              }}
            >
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </form>
      </div>
    )}
  </Formik>
);

MessageForm.propTypes = {
  userName: PropTypes.string.isRequired,
  submittingState: PropTypes.string.isRequired,
  activeChannel: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default flow(
  connect(
    (state) => ({
      userName: getUserName(state),
      activeChannel: getActiveChannel(state),
      submittingState: getMessageSubmittingState(state),
    }),
    (dispatch) => ({
      onSubmit: (author, channelId) => (values, { resetForm }) => {
        const text = get(values, 'message');
        const data = {
          data: {
            attributes: {
              text,
              author,
            },
          },
        };

        dispatch(actions.submitMessage(channelId, data, resetForm));
      },
    }),
  ),
)(MessageForm);
