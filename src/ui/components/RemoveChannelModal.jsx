import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from './Modal';
import { getActiveChannel } from '../../redux/slices/activeChannel';
import { getChannelRemovingState } from '../../redux/slices/channelRemovingState';
import { actions } from '../../redux/slices';

const RemoveChannelModal = () => {
  const channelRemovingState = useSelector(getChannelRemovingState);
  const activeChannel = useSelector(getActiveChannel);
  const dispatch = useDispatch();

  return (
    <Modal title="Remove channel">
      <div className="w-100 d-flex justify-content-between">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => dispatch(actions.hideModal())}
        >
          Dismiss
        </button>

        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => dispatch(actions.deleteChannel(activeChannel))}
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

export default RemoveChannelModal;
