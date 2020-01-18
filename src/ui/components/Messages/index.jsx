import React from 'react';
import Message from '../Message';

const messages = [
  {
    id: 1,
    name: 'Alex',
    time: '12:00 AM',
    text: 'Here goes some text',
  },
  {
    id: 2,
    name: 'Alex',
    time: '12:00 AM',
    text: 'Here goes some text',
  },
  {
    id: 3,
    name: 'Alex',
    time: '12:00 AM',
    text: 'Here goes some text',
  },
  {
    id: 4,
    name: 'Alex',
    time: '12:00 AM',
    text: 'Here goes some text',
  },
];

const Messages = () => (
  <div className="w-100 flex-grow-1 p-3 overflow-auto">
    {
      messages.map((message) => (
        <Message
          key={message.id}
          name={message.name}
          time={message.time}
          text={message.text}
        />
      ))
    }
  </div>
);

export default Messages;
