import { combineReducers } from 'redux';

import reducers from '../reducers';

import messageSubmittingState, { actions as messageSubmittingStateActions } from './messageSubmittingState';
import messages, { actions as messagesActions } from './messages';

import channelAddingState, { actions as channelAddingStateActions } from './channelAddingState';

export default combineReducers({
  messageSubmittingState,
  messages,
  channelAddingState,
  ...reducers,
});

const actions = {
  ...messageSubmittingStateActions,
  ...messagesActions,
  ...channelAddingStateActions,
};

export { actions };
