import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';
import flow from 'lodash/flow';
import get from 'lodash/get';
import find from 'lodash/find';
import toNumber from 'lodash/toNumber';
import io from 'socket.io-client/dist/socket.io.js';
import { connect } from 'react-redux';
import Aside from '../Aside/index';
import Nav from '../Nav/index';
import Messages from '../Messages/index';
import MessageForm from '../MessageForm/index';
import ErrorMessage from '../ErrorMessage/index';
import AddChannelModal from '../AddChannelModal/index';
import RemoveChannelModal from '../RemoveChannelModal/index';
import * as actions from '../../../redux/actions';
import { getActiveChannel, getMessagesForChannel, getChannels } from '../../../redux/reducers';

const Layout = ({
  messages,
  channels,
  activateChannel,
  receiveMessage,
  receiveChannel,
}) => {
  const match = useRouteMatch();

  useEffect(() => {
    const channel = toNumber(get(match, 'params.channel'));

    activateChannel({ channel });
  });

  useEffect(() => {
    const socket = io();

    socket.on('newMessage', (data) => {
      const message = get(data, 'data.attributes');
      const isMessageExist = find(messages, (m) => m.id === message.id);

      if (isMessageExist) return;

      receiveMessage({ message });
    });

    socket.on('newChannel', (data) => {
      const channel = get(data, 'data.attributes');
      const isChannelExist = find(channels, (c) => c.id === channel.id);

      if (isChannelExist) return;

      receiveChannel({ channel });
    });

    return () => {
      socket.close();
    };
  }, [messages]);

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

      <AddChannelModal />

      <RemoveChannelModal />

      <ErrorMessage />
    </div>
  );
};

Layout.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object),
  channels: PropTypes.arrayOf(PropTypes.object),
  activateChannel: PropTypes.func.isRequired,
  receiveMessage: PropTypes.func.isRequired,
  receiveChannel: PropTypes.func.isRequired,
};

Layout.defaultProps = {
  messages: [],
  channels: [],
};

export default flow(
  connect(
    (state) => {
      const activeChannel = getActiveChannel(state);
      const messages = getMessagesForChannel(state, activeChannel);
      const channels = getChannels(state);

      return { messages, channels };
    },
    actions,
  ),
)(Layout);
