import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
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
        messages.map(({
          id,
          author,
          date,
          text,
        }) => (
          <div key={id} className="card mb-4 w-100 border-0">
            <div className="row no-gutters">
              <div className="col-sm-12">
                <div className="card-body p-0">
                  <h5 className="card-title mb-1">{author}</h5>

                  <p className="card-text mb-1">{text}</p>

                  <p className="card-text"><small className="text-muted">{date}</small></p>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default Messages;
