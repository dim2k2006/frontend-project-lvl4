import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import Modal from './Modal';
import { getChannelAddingState } from '../../redux/slices/channelAddingState';
import connect from '../../connect';

const AddChannelModal = ({ createChannel }) => {
  const channelAddingState = useSelector(getChannelAddingState);
  const formik = useFormik({
    initialValues: { name: '' },
    onSubmit: (values, { resetForm }) => {
      const name = get(values, 'name');
      const data = {
        data: {
          attributes: {
            name,
          },
        },
      };

      createChannel(data, resetForm);
    },
  });

  return (
    <Modal title="Add channel">
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
            disabled={channelAddingState === 'requested'}
          />
        </div>

        <button className="btn btn-primary" type="submit" disabled={channelAddingState === 'requested'}>
          {channelAddingState === 'requested' && (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
          )}

          Create channel
        </button>
      </form>
    </Modal>
  );
};

AddChannelModal.propTypes = {
  createChannel: PropTypes.func.isRequired,
};

export default connect()(AddChannelModal);
