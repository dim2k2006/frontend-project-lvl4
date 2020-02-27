import { combineReducers } from 'redux';

import reducers from '../reducers';

import messageSubmittingState, { actions as messageSubmittingStateActions } from './messageSubmittingState';
import messages, { actions as messagesActions } from './messages';

import channelAddingState, { actions as channelAddingStateActions } from './channelAddingState';
import channelRemovingState, { actions as channelRemovingStateActions } from './channelRemovingState';
import channelEditingState, { actions as channelEditingStateActions } from './channelEditingState';

import modalState, { actions as modalStateActions } from './modalState';

import activeChannel, { actions as activeChannelActions } from './activeChannel';

export default combineReducers({
  messageSubmittingState,
  messages,
  channelAddingState,
  channelRemovingState,
  channelEditingState,
  modalState,
  activeChannel,
  ...reducers,
});

const actions = {
  ...messageSubmittingStateActions,
  ...messagesActions,
  ...channelAddingStateActions,
  ...channelRemovingStateActions,
  ...channelEditingStateActions,
  ...modalStateActions,
  ...activeChannelActions,
};

export { actions };
