import React from 'react';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getChannels } from '../../../redux/reducers';

const Aside = ({ channels }) => (
  <ul className="list-group list-group-flush">
    {
      channels.map((channel) => (
        <li key={channel.id} className="list-group-item bg-transparent">
          <Link to={`/channels/${channel.name}`}>
            <button type="button" className="btn btn-link text-white">{channel.name}</button>
          </Link>
        </li>
      ))
    }
  </ul>
);

Aside.propTypes = {
  channels: PropTypes.arrayOf(PropTypes.object),
};

Aside.defaultProps = {
  channels: [],
};

export default flow(
  connect(
    (state) => ({
      channels: getChannels(state),
    }),
  ),
)(Aside);
