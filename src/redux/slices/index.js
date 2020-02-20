import { combineReducers } from 'redux';

import reducers from '../reducers';

import messageSubmittingState, { actions as messageSubmittingStateActions } from './messageSubmittingState';
import messages, { actions as messagesActions } from './messages';

export default combineReducers({
  messageSubmittingState,
  messages,
  ...reducers,
});

const actions = {
  ...messageSubmittingStateActions,
  ...messagesActions,
};

export { actions };
