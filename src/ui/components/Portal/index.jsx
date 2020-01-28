import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import usePortal from '../../hooks/usePortal';

const Portal = ({ id, children }) => {
  const target = usePortal(id);

  return createPortal(
    children,
    target,
  );
};

Portal.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Portal;
