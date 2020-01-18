import React from 'react';
import PropTypes from 'prop-types';

const Message = ({
  name,
  time,
  text,
}) => (
  <div className="card mb-3">
    <div className="row no-gutters">
      <div className="col-md-4">
        <img src="https://via.placeholder.com/36" className="card-img" alt={name} />
      </div>

      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{text}</p>
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
