import React from 'react';
import PropTypes from 'prop-types';
import flow from 'lodash/flow';
import get from 'lodash/get';
import find from 'lodash/find';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import Modal from '../Modal';
import {
  getModalState,
  getChannelEditingState,
  getActiveChannel,
  getChannels,
} from '../../../redux/reducers';
import * as actions from '../../../redux/actions';

const EditChannelModal = ({
  modalState,
  channelName,
  activeChannel,
  channelEditingState,
  onSubmit,
}) => {
  if (modalState !== 'editingChannel') return null;

  return (
    <Modal title="Edit channel">
      <Formik
        initialValues={{ name: channelName }}
        onSubmit={onSubmit(activeChannel)}
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

EditChannelModal.propTypes = {
  modalState: PropTypes.string.isRequired,
  channelName: PropTypes.string,
  activeChannel: PropTypes.number.isRequired,
  channelEditingState: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

EditChannelModal.defaultProps = {
  channelName: '',
};

export default flow(
  connect(
    (state) => {
      const modalState = getModalState(state);
      const channelEditingState = getChannelEditingState(state);
      const activeChannel = getActiveChannel(state);
      const channels = getChannels(state);
      const activeChannelData = find(channels, (channel) => channel.id === activeChannel);
      const channelName = get(activeChannelData, 'name');

      return {
        modalState,
        channelName,
        activeChannel,
        channelEditingState,
      };
    },
    (dispatch) => ({
      onSubmit: (channelId) => (values, { resetForm }) => {
        const name = get(values, 'name');
        const data = {
          data: {
            attributes: {
              name,
            },
          },
        };

        dispatch(actions.updateChannel(channelId, data, resetForm));
      },
    }),
  ),
)(EditChannelModal);
