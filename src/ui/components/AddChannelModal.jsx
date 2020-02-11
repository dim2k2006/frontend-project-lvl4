import React from 'react';
import PropTypes from 'prop-types';
import flow from 'lodash/flow';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import Modal from './Modal';
import { getModalState, getChannelAddingState } from '../../redux/reducers';
import * as actions from '../../redux/actions';

const AddChannelModal = ({ modalState, channelAddingState, onSubmit }) => {
  if (modalState !== 'addingChannel') return null;

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

AddChannelModal.propTypes = {
  modalState: PropTypes.string.isRequired,
  channelAddingState: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default flow(
  connect(
    (state) => ({
      modalState: getModalState(state),
      channelAddingState: getChannelAddingState(state),
    }),
    (dispatch) => ({
      onSubmit: (values, { resetForm }) => {
        const name = get(values, 'name');
        const data = {
          data: {
            attributes: {
              name,
            },
          },
        };

        dispatch(actions.createChannel(data, resetForm));
      },
    }),
  ),
)(AddChannelModal);
