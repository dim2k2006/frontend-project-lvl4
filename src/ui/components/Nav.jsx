import React from 'react';
import get from 'lodash/get';
import find from 'lodash/find';
import { useSelector, useDispatch } from 'react-redux';
import { getChannels } from '../../redux/slices/channels';
import { getActiveChannel } from '../../redux/slices/activeChannel';
import { actions } from '../../redux/slices';

const Nav = () => {
  const channels = useSelector(getChannels);
  const activeChannel = useSelector(getActiveChannel);
  const channel = find(channels, (ch) => ch.id === activeChannel);
  const channelName = get(channel, 'name', '');
  const removable = get(channel, 'removable', false);
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-light bg-light border-bottom w-100 d-flex justify-content-between">
      <h5 className="text-capitalize mb-0">{channelName}</h5>

      <div>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => dispatch(actions.editChannel())}
        >
          Edit
        </button>

        {removable && (
          <button
            type="button"
            className="btn btn-danger btn-sm ml-2"
            onClick={() => dispatch(actions.showModal('removing'))}
          >
            Remove
          </button>
        )}
      </div>
    </nav>
  );
};

export default Nav;
