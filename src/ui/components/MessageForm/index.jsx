import React from 'react';
import PropTypes from 'prop-types';
import flow from 'lodash/flow';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as actions from '../../../redux/actions';

const MessageForm = ({ onSubmit }) => (
  <Formik
    initialValues={{ message: '' }}
    onSubmit={onSubmit}
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
          className="w-100 p-3"
        >
          <textarea
            name="message"
            className="form-control w-100"
            placeholder="Enter Your Message"
            value={props.values.name}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
          />
        </form>
      </div>
    )}
  </Formik>
);

MessageForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default flow(
  connect(
    null,
    (dispatch) => ({
      onSubmit: (data) => {
        console.log('data:', data);
      },
    }),
  ),
)(MessageForm);
