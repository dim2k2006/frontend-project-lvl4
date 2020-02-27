import React from 'react';
import PropTypes from 'prop-types';
import flow from 'lodash/flow';
import get from 'lodash/get';
import find from 'lodash/find';
import { withProps } from 'recompose';
import { connect } from 'react-redux';
import { getChannels } from '../../redux/reducers';
import { getActiveChannel } from '../../redux/slices/activeChannel';
import { actions } from '../../redux/slices';

const Nav = ({
  channelName,
  removable,
  removeChannel,
  editChannel,
}) => (
  <nav className="navbar navbar-light bg-light border-bottom w-100 d-flex justify-content-between">
    <h5 className="text-capitalize mb-0">{channelName}</h5>

    <div>
      <button
        type="button"
        className="btn btn-secondary btn-sm"
        onClick={() => editChannel()}
      >
        Edit
      </button>

      {removable && (
        <button
          type="button"
          className="btn btn-danger btn-sm ml-2"
          onClick={() => removeChannel()}
        >
          Remove
        </button>
      )}
    </div>
  </nav>
);

Nav.propTypes = {
  channelName: PropTypes.string.isRequired,
  removable: PropTypes.bool.isRequired,
  removeChannel: PropTypes.func.isRequired,
  editChannel: PropTypes.func.isRequired,
};

export default flow(
  withProps((props) => {
    const channels = get(props, 'channels');
    const activeChannel = get(props, 'activeChannel');
    const channel = find(channels, (ch) => ch.id === activeChannel);
    const channelName = get(channel, 'name', '');
    const removable = get(channel, 'removable', false);

    return { channelName, removable };
  }),
  connect(
    (state) => ({
      channels: getChannels(state),
      activeChannel: getActiveChannel(state),
    }),
    actions,
  ),
)(Nav);
