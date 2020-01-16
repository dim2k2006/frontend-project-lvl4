import React from 'react';
import PropTypes from 'prop-types';
import flow from 'lodash/flow';
import get from 'lodash/get';
import find from 'lodash/find';
import { withProps } from 'recompose';

import { connect } from 'react-redux';
import { getChannels, getActiveChannel } from '../../../redux/reducers';

const Nav = ({ channelName }) => (
  <nav className="navbar navbar-light bg-light border-bottom w-100">
    <h5 className="text-capitalize">{channelName}</h5>
  </nav>
);

Nav.propTypes = {
  channelName: PropTypes.string,
};

Nav.defaultProps = {
  channelName: '',
};

export default flow(
  withProps((props) => {
    const channels = get(props, 'channels');
    const activeChannel = get(props, 'activeChannel');
    const channel = find(channels, (ch) => ch.id === activeChannel);
    const channelName = get(channel, 'name');

    return { channelName };
  }),
  connect(
    (state) => ({
      channels: getChannels(state),
      activeChannel: getActiveChannel(state),
    }),
  ),
)(Nav);
