import React from 'react';
import PropTypes from 'prop-types';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import Modal from '../Modal';
import { getModalState } from '../../../redux/reducers';

const AddChannelModal = ({ modalState }) => {
  if (modalState !== 'addingChannel') return null;

  return (
    <Modal title="Add channel">
      <div>
        Here goes add channel modal
      </div>
    </Modal>
  );
};

AddChannelModal.propTypes = {
  modalState: PropTypes.string.isRequired,
};

export default flow(
  connect(
    (state) => ({
      modalState: getModalState(state),
    }),
  ),
)(AddChannelModal);
