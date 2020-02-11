import React from 'react';
import PropTypes from 'prop-types';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import cn from 'classnames';
import { getErrorMessage } from '../../redux/reducers';
import * as actions from '../../redux/actions';

const ErrorMessage = ({ message, resetErrorMessage }) => {
  if (!message) return null;

  const componentClass = cn({
    alert: true,
    'alert-danger': true,
    fade: true,
    show: true,
  });

  return (
    <div className="position-fixed fixed-top p-4" style={{ zIndex: '9999' }}>
      <div className="container">
        <div className={componentClass} role="alert">
          {message}

          <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={resetErrorMessage}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
  resetErrorMessage: PropTypes.func.isRequired,
};

ErrorMessage.defaultProps = {
  message: '',
};

export default flow(
  connect(
    (state) => ({
      message: getErrorMessage(state),
    }),
    actions,
  ),
)(ErrorMessage);
