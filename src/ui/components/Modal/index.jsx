import React from 'react';
import PropTypes from 'prop-types';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import Portal from '../Portal';
import * as actions from '../../../redux/actions';

const Modal = ({ title, children, resetModal }) => (
  <Portal id="modal">
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>

            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => resetModal()}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>

    <div className="modal-backdrop fade show" />
  </Portal>
);

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  resetModal: PropTypes.func.isRequired,
};

export default flow(
  connect(
    null,
    actions,
  ),
)(Modal);
