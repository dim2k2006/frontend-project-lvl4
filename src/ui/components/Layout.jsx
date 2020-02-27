import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import get from 'lodash/get';
import find from 'lodash/find';
import toNumber from 'lodash/toNumber';
import io from 'socket.io-client/dist/socket.io.js';
import { useSelector, useDispatch } from 'react-redux';
import Aside from './Aside';
import Nav from './Nav';
import Messages from './Messages';
import MessageForm from './MessageForm';
import ErrorMessage from './ErrorMessage';
import AddChannelModal from './AddChannelModal';
import EditChannelModal from './EditChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import * as actions from '../../redux/actions';
import { actions as sliceActions } from '../../redux/slices';
import { getChannels } from '../../redux/reducers';
import { getActiveChannel } from '../../redux/slices/activeChannel';
import { getMessagesForChannel } from '../../redux/slices/messages';

const Layout = () => {
  const match = useRouteMatch();
  const activeChannel = useSelector(getActiveChannel);
  const messages = useSelector((state) => getMessagesForChannel(state, activeChannel));
  const channels = useSelector(getChannels);
  const dispatch = useDispatch();

  useEffect(() => {
    const channel = toNumber(get(match, 'params.channel'));

    dispatch(sliceActions.activateChannel({ channel }));
  });

  useEffect(() => {
    const socket = io();

    socket.on('newMessage', (data) => {
      const message = get(data, 'data.attributes');
      const isMessageExist = find(messages, (m) => m.id === message.id);

      if (isMessageExist) return;

      dispatch(actions.receiveMessage({ message }));
    });

    socket.on('newChannel', (data) => {
      const channel = get(data, 'data.attributes');
      const isChannelExist = find(channels, (c) => c.id === channel.id);

      if (isChannelExist) return;

      dispatch(actions.receiveChannel({ channel }));
    });

    socket.on('removeChannel', (data) => {
      const id = get(data, 'data.id');

      dispatch(actions.receiveRemovedChannel({ id }));
    });

    socket.on('renameChannel', (data) => {
      const channel = get(data, 'data.attributes');

      dispatch(actions.receiveEditedChannel({ channel }));
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

      <EditChannelModal />

      <ErrorMessage />
    </div>
  );
};

export default Layout;
