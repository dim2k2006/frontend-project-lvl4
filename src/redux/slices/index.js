import { combineReducers } from 'redux';

import messageSubmittingState, { actions as messageSubmittingStateActions } from './messageSubmittingState';
import messages, { actions as messagesActions } from './messages';

export default combineReducers({
  messageSubmittingState,
  messages,
});

const actions = {
  ...messageSubmittingStateActions,
  ...messagesActions,
};

export { actions };
