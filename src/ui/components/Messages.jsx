import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getSelector } from '../../redux/slices';

const Messages = () => {
  const container = useRef(null);
  const activeChannel = useSelector(getSelector('activeChannel'));
  const messages = useSelector((state) => getSelector('messagesForChannel')(state, activeChannel));

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
