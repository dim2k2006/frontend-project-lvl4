import { combineReducers } from 'redux';

import reducers from '../reducers';

import messageSubmittingState, { actions as messageSubmittingStateActions } from './messageSubmittingState';
import messages, { actions as messagesActions } from './messages';

import channelAddingState, { actions as channelAddingStateActions } from './channelAddingState';
import channelRemovingState, { actions as channelRemovingStateActions } from './channelRemovingState';

import modalState, { actions as modalStateActions } from './modalState';

export default combineReducers({
  messageSubmittingState,
  messages,
  channelAddingState,
  channelRemovingState,
  modalState,
  ...reducers,
});

const actions = {
  ...messageSubmittingStateActions,
  ...messagesActions,
  ...channelAddingStateActions,
  ...channelRemovingStateActions,
  ...modalStateActions,
};

export { actions };
