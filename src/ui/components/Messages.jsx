import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Message from './Message';
import { getActiveChannel } from '../../redux/slices/activeChannel';
import { getMessagesForChannel } from '../../redux/slices/messages';

const Messages = () => {
  const container = useRef(null);
  const activeChannel = useSelector(getActiveChannel);
  const messages = useSelector((state) => getMessagesForChannel(state, activeChannel));

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

export default Messages;
