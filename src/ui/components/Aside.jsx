import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Octicon, { Plus } from '@primer/octicons-react';
import { getSelector } from '../../redux/slices';
import connect from '../../connect';

const Aside = ({ showModal }) => {
  const channels = useSelector(getSelector('channels'));
  const activeChannel = useSelector(getSelector('activeChannel'));
  const userName = useSelector(getSelector('userName'));

  return (
    <div className="pt-4">
      <div className="mb-4">
        <h3 className="text-white mb-0">Hexlet:slack</h3>

        <small className="text-white">{userName}</small>
      </div>

      <h5 className="text-white position-relative w-100 d-flex justify-content-between">
        Channels

        <button
          type="button"
          className="position-relative btn btn-link text-white p-0 pl-1 pr-1"
          onClick={() => showModal({ type: 'adding' })}
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

Aside.propTypes = {
  showModal: PropTypes.func.isRequired,
};

export default connect()(Aside);
