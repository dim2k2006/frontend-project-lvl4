import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import Message from '../Message';
import { getActiveChannel, getMessagesForChannel } from '../../../redux/reducers';

const Messages = ({ messages }) => {
  const container = useRef(null);

  useEffect(() => {
    container.current.scrollTo(0, 1e10);
  });

  return (
    <div ref={container} className="w-100 flex-grow-1 p-3 overflow-auto">
      {
        messages.map((message) => (
          <Message
            key={message.id}
            name={message.author}
            time={message.date}
            text={message.text}
          />
        ))
      }
    </div>
  );
};

Messages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object),
};

Messages.defaultProps = {
  messages: [],
};

export default flow(
  connect(
    (state) => {
      const activeChannel = getActiveChannel(state);
      const messages = getMessagesForChannel(state, activeChannel);

      return { messages };
    },
  ),
)(Messages);
