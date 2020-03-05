import React from 'react';
import get from 'lodash/get';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import Modal from './Modal';
import { getChannelAddingState } from '../../redux/slices/channelAddingState';
import { actions } from '../../redux/slices';

const AddChannelModal = () => {
  const channelAddingState = useSelector(getChannelAddingState);
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

    dispatch(actions.createChannel(data, resetForm));
  };

  return (
    <Modal title="Add channel">
      <Formik
        initialValues={{ name: '' }}
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
        )}
      </Formik>
    </Modal>
  );
};

export default AddChannelModal;
