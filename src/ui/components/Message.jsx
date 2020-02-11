import React from 'react';
import PropTypes from 'prop-types';

const Message = ({
  name,
  time,
  text,
}) => (
  <div className="card mb-4 w-100 border-0">
    <div className="row no-gutters">
      <div className="col-sm-12">
        <div className="card-body p-0">
          <h5 className="card-title mb-1">{name}</h5>

          <p className="card-text mb-1">{text}</p>

          <p className="card-text"><small className="text-muted">{time}</small></p>
        </div>
      </div>
    </div>
  </div>
);

Message.propTypes = {
  name: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Message;
