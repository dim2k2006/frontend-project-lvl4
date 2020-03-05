import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';
import get from 'lodash/get';
import find from 'lodash/find';
import toNumber from 'lodash/toNumber';
import io from 'socket.io-client/dist/socket.io.js';
import { useSelector } from 'react-redux';
import Aside from './Aside';
import Nav from './Nav';
import Messages from './Messages';
import MessageForm from './MessageForm';
import ErrorMessage from './ErrorMessage';
import AddChannelModal from './AddChannelModal';
import EditChannelModal from './EditChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import { getChannels } from '../../redux/slices/channels';
import { getModalState } from '../../redux/slices/modalState';
import { getActiveChannel } from '../../redux/slices/activeChannel';
import { getMessagesForChannel } from '../../redux/slices/messages';
import connect from '../../connect';

const modalsMap = {
  adding: AddChannelModal,
  editing: EditChannelModal,
  removing: RemoveChannelModal,
};

const renderModal = (type) => {
  const Component = get(modalsMap, type);

  if (!Component) return null;

  return <Component />;
};

const Layout = ({
  activateChannel,
  addMessage,
  addChannel,
  removeChannel,
  editChannel,
}) => {
  const match = useRouteMatch();
  const currentChannel = toNumber(get(match, 'params.channel'));
  const activeChannel = useSelector(getActiveChannel);
  const messages = useSelector((state) => getMessagesForChannel(state, activeChannel));
  const channels = useSelector(getChannels);
  const modalState = useSelector(getModalState);

  useEffect(() => {
    activateChannel({ channel: currentChannel });
  }, [currentChannel]);

  useEffect(() => {
    const socket = io();

    socket.on('newMessage', (data) => {
      const message = get(data, 'data.attributes');
      const isMessageExist = find(messages, (m) => m.id === message.id);

      if (isMessageExist) return;

      addMessage({ message });
    });

    socket.on('newChannel', (data) => {
      const channel = get(data, 'data.attributes');
      const isChannelExist = find(channels, (c) => c.id === channel.id);

      if (isChannelExist) return;

      addChannel({ channel });
    });

    socket.on('removeChannel', (data) => {
      const id = get(data, 'data.id');

      removeChannel({ id });
    });

    socket.on('renameChannel', (data) => {
      const channel = get(data, 'data.attributes');

      editChannel({ channel });
    });

    return () => {
      socket.close();
    };
  }, [messages, channels]);

  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <div className="col-4 col-sm-4 col-md-3 col-lg-3 col-xl-2 h-100 bg-info">
          <Aside />
        </div>

        <div className="col-8 col-sm-8 col-md-9 col-lg-9 col-xl-10 h-100">
          <div className="row h-100 flex-column flex-nowrap">
            <Nav />

            <Messages />

            <MessageForm />
          </div>
        </div>
      </div>

      {renderModal(modalState)}

      <ErrorMessage />
    </div>
  );
};

Layout.propTypes = {
  activateChannel: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  addChannel: PropTypes.func.isRequired,
  removeChannel: PropTypes.func.isRequired,
  editChannel: PropTypes.func.isRequired,
};

export default connect()(Layout);
