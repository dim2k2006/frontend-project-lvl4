import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import find from 'lodash/find';
import { useSelector } from 'react-redux';
import { getSelector } from '../../redux/slices';
import connect from '../../connect';

const Nav = ({ showModal }) => {
  const channels = useSelector(getSelector('channels'));
  const activeChannel = useSelector(getSelector('activeChannel'));
  const channel = find(channels, (ch) => ch.id === activeChannel);
  const channelName = get(channel, 'name', '');
  const removable = get(channel, 'removable', false);

  return (
    <nav className="navbar navbar-light bg-light border-bottom w-100 d-flex justify-content-between">
      <h5 className="text-capitalize mb-0">{channelName}</h5>

      <div>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => showModal({ type: 'editing' })}
        >
          Edit
        </button>

        {removable && (
          <button
            type="button"
            className="btn btn-danger btn-sm ml-2"
            onClick={() => showModal({ type: 'removing' })}
          >
            Remove
          </button>
        )}
      </div>
    </nav>
  );
};

Nav.propTypes = {
  showModal: PropTypes.func.isRequired,
};

export default connect()(Nav);
