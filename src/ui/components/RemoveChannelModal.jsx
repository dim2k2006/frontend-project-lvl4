import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Modal from './Modal';
import { getSelector } from '../../redux/slices';
import connect from '../../connect';

const RemoveChannelModal = ({ hideModal, deleteChannel }) => {
  const channelRemovingState = useSelector(getSelector('channelRemovingState'));
  const activeChannel = useSelector(getSelector('activeChannel'));

  return (
    <Modal title="Remove channel">
      <div className="w-100 d-flex justify-content-between">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={hideModal}
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
  hideModal: PropTypes.func.isRequired,
  deleteChannel: PropTypes.func.isRequired,
};

export default connect()(RemoveChannelModal);
