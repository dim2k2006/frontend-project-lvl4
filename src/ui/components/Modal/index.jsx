import React from 'react';
import PropTypes from 'prop-types';
import Portal from '../Portal';

const Modal = ({ title, children, onClose }) => (
  <Portal id="modal">
    <div
      className="modal fade"
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
              onClick={onClose}
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
  </Portal>
);

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
