import React from 'react';
import get from 'lodash/get';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { actions } from '../../redux/slices';
import { getUserName, getActiveChannel } from '../../redux/reducers';
import { getMessageSubmittingState } from '../../redux/slices/messageSubmittingState';

const MessageForm = () => {
  const userName = useSelector(getUserName);
  const activeChannel = useSelector(getActiveChannel);
  const submittingState = useSelector(getMessageSubmittingState);
  const dispatch = useDispatch();
  const onSubmit = (values, { resetForm }) => {
    const text = get(values, 'message');
    const data = {
      data: {
        attributes: {
          text,
          author: userName,
        },
      },
    };

    dispatch(actions.submitMessage(activeChannel, data, resetForm));
  };

  return (
    <Formik
      initialValues={{ message: '' }}
      onSubmit={onSubmit}
    >
      {(props) => (
        <div
          role="presentation"
          onKeyDown={(event) => {
            const message = get(props, 'values.message', '');

            if (!message.length || event.keyCode !== 13) return;

            event.preventDefault();

            props.handleSubmit();
          }}
        >
          <form
            onSubmit={props.handleSubmit}
            className="w-100 p-3 position-relative"
          >
            <textarea
              name="message"
              className="form-control w-100"
              placeholder="Enter Your Message"
              value={props.values.message}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              disabled={submittingState === 'requested'}
            />

            {submittingState === 'requested' && (
              <div
                className="spinner-border text-info position-absolute"
                role="status"
                style={{
                  top: '50%',
                  left: '50%',
                  marginTop: '-16px',
                  marginLeft: '-16px',
                }}
              >
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </form>
        </div>
      )}
    </Formik>
  );
};

export default MessageForm;
