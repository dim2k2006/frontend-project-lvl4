import React from 'react';
import PropTypes from 'prop-types';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import Modal from '../Modal';
import { getModalState, getChannelRemovingState, getActiveChannel } from '../../../redux/reducers';
import * as actions from '../../../redux/actions';

const RemoveChannelModal = ({
  modalState,
  channelRemovingState,
  activeChannel,
  deleteChannel,
  resetModal,
}) => {
  if (modalState !== 'removingChannel') return null;

  return (
    <Modal title="Remove channel">
      <div className="w-100 d-flex justify-content-between">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => resetModal()}
        >
          Dismiss
        </button>

        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => deleteChannel(activeChannel)}
          disabled={channelRemovingState === 'requested'}
        >
          {channelRemovingState === 'requested' && (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
          )}

          Confirm
        </button>
      </div>
    </Modal>
  );
};

RemoveChannelModal.propTypes = {
  modalState: PropTypes.string.isRequired,
  channelRemovingState: PropTypes.string.isRequired,
  activeChannel: PropTypes.number.isRequired,
  deleteChannel: PropTypes.func.isRequired,
};

export default flow(
  connect(
    (state) => ({
      modalState: getModalState(state),
      channelRemovingState: getChannelRemovingState(state),
      activeChannel: getActiveChannel(state),
    }),
    actions,
  ),
)(RemoveChannelModal);
