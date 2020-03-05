import { connect } from 'react-redux';
import { actions } from './redux/slices';

export default () => (Component) => connect(null, { ...actions })(Component);
