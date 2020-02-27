import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Octicon, { Plus } from '@primer/octicons-react';
import { getChannels, getUserName } from '../../redux/reducers';
import { getActiveChannel } from '../../redux/slices/activeChannel';
import { actions } from '../../redux/slices';

const Aside = () => {
  const channels = useSelector(getChannels);
  const activeChannel = useSelector(getActiveChannel);
  const userName = useSelector(getUserName);
  const dispatch = useDispatch();

  return (
    <div className="pt-4">
      <div className="mb-4">
        <h3 className="text-white mb-0">Hexlet:slack</h3>

        <small className="text-white">{userName}</small>
      </div>

      <h5 className="text-white position-relative">
        Channels

        <button
          type="button"
          className="position-absolute btn btn-link text-white p-0 pl-1 pr-1"
          style={{ right: '0', top: '50%', transform: 'translateY(-50%)' }}
          onClick={() => dispatch(actions.addChannel())}
        >
          <Octicon icon={Plus} />
        </button>
      </h5>

      <ul className="list-group list-group-flush">
        {
          channels.map((channel) => {
            const Tag = channel.id === activeChannel ? 'strong' : 'span';

            return (
              <li key={channel.id} className="list-group-item bg-transparent pl-0 pt-0 pb-0 border-bottom-0">
                <Link to={`/channels/${channel.id}`} className="d-block">
                  <button type="button" className="btn btn-link text-decoration-none text-white text-capitalize p-0">
                    <Tag>
                      #
                      {channel.name}
                    </Tag>
                  </button>
                </Link>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Aside;
