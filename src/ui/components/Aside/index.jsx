import React from 'react';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getChannels, getUserName, getActiveChannel } from '../../../redux/reducers';

const Aside = ({ channels, userName, activeChannel }) => (
  <div className="pt-4">
    <h6 className="text-white">{userName}</h6>

    <ul className="list-group list-group-flush">
      {
        channels.map((channel) => {
          const Tag = channel.name === activeChannel ? 'strong' : 'span';

          return (
            <li key={channel.id} className="list-group-item bg-transparent">
              <Link to={`/channels/${channel.name}`}>
                <button type="button" className="btn btn-link text-white"><Tag>{channel.name}</Tag></button>
              </Link>
            </li>
          );
        })
      }
    </ul>
  </div>
);

Aside.propTypes = {
  channels: PropTypes.arrayOf(PropTypes.object),
  userName: PropTypes.string.isRequired,
  activeChannel: PropTypes.string.isRequired,
};

Aside.defaultProps = {
  channels: [],
};

export default flow(
  connect(
    (state) => ({
      channels: getChannels(state),
      activeChannel: getActiveChannel(state),
      userName: getUserName(state),
    }),
  ),
)(Aside);
