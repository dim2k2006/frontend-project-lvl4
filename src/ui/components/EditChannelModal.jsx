import React from 'react';
import get from 'lodash/get';
import find from 'lodash/find';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import Modal from './Modal';
import { getActiveChannel, getChannels } from '../../redux/reducers';
import { getModalState } from '../../redux/slices/modalState';
import { getChannelEditingState } from '../../redux/slices/channelEditingState';
import { actions } from '../../redux/slices';

const EditChannelModal = () => {
  const modalState = useSelector(getModalState);
  const channelEditingState = useSelector(getChannelEditingState);
  const activeChannel = useSelector(getActiveChannel);
  const channels = useSelector(getChannels);
  const activeChannelData = find(channels, (channel) => channel.id === activeChannel);
  const channelName = get(activeChannelData, 'name');
  const dispatch = useDispatch();
  const onSubmit = (values, { resetForm }) => {
    const name = get(values, 'name');
    const data = {
      data: {
        attributes: {
          name,
        },
      },
    };

    dispatch(actions.updateChannel(activeChannel, data, resetForm));
  };

  if (modalState !== 'editingChannel') return null;

  return (
    <Modal title="Edit channel">
      <Formik
        initialValues={{ name: channelName }}
        onSubmit={onSubmit}
      >
        {(props) => (
          <form
            onSubmit={props.handleSubmit}
            className="w-100 p-3 position-relative"
          >
            <div className="form-group">
              <input
                type="text"
                name="name"
                className="form-control w-100"
                placeholder="Enter Channel name"
                value={props.values.name}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                disabled={channelEditingState === 'requested'}
              />
            </div>

            <button className="btn btn-primary" type="submit" disabled={channelEditingState === 'requested'}>
              {channelEditingState === 'requested' && (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
              )}

              Edit channel
            </button>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default EditChannelModal;
