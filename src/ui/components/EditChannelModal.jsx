import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import find from 'lodash/find';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import Modal from './Modal';
import { getChannels } from '../../redux/slices/channels';
import { getActiveChannel } from '../../redux/slices/activeChannel';
import { getChannelEditingState } from '../../redux/slices/channelEditingState';
import connect from '../../connect';

const EditChannelModal = ({ updateChannel }) => {
  const channelEditingState = useSelector(getChannelEditingState);
  const activeChannel = useSelector(getActiveChannel);
  const channels = useSelector(getChannels);
  const activeChannelData = find(channels, (channel) => channel.id === activeChannel);
  const channelName = get(activeChannelData, 'name');
  const formik = useFormik({
    initialValues: { name: channelName },
    onSubmit: (values, { resetForm }) => {
      const name = get(values, 'name');
      const data = {
        data: {
          attributes: {
            name,
          },
        },
      };

      updateChannel(activeChannel, data, resetForm);
    },
  });

  return (
    <Modal title="Edit channel">
      <form
        onSubmit={formik.handleSubmit}
        className="w-100 p-3 position-relative"
      >
        <div className="form-group">
          <input
            type="text"
            name="name"
            className="form-control w-100"
            placeholder="Enter Channel name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
    </Modal>
  );
};

EditChannelModal.propTypes = {
  updateChannel: PropTypes.func.isRequired,
};

export default connect()(EditChannelModal);
