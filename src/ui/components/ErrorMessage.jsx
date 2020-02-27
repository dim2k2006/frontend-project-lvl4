import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { getErrorMessage } from '../../redux/slices/errorMessage';
import { actions } from '../../redux/slices';

const ErrorMessage = () => {
  const message = useSelector(getErrorMessage);
  const dispatch = useDispatch();

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

          <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => dispatch(actions.resetErrorMessage)}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
