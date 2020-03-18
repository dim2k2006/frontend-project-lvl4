import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { getSelector } from '../../redux/slices';
import connect from '../../connect';
import i18n from '../../i18n';

const ErrorMessage = ({ hideError }) => {
  const key = useSelector(getSelector('errorMessage'));

  if (!key) return null;

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
          {i18n.t(key)}

          <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={hideError}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

ErrorMessage.propTypes = {
  hideError: PropTypes.func.isRequired,
};

export default connect()(ErrorMessage);
