import { combineReducers } from 'redux';

import messageSubmittingState, { actions as messageSubmittingStateActions } from './messageSubmittingState';
import messages, { actions as messagesActions } from './messages';

import channelAddingState, { actions as channelAddingStateActions } from './channelAddingState';
import channelRemovingState, { actions as channelRemovingStateActions } from './channelRemovingState';
import channelEditingState, { actions as channelEditingStateActions } from './channelEditingState';
import channels, { actions as channelsActions } from './channels';

import modalState, { actions as modalStateActions } from './modalState';

import activeChannel, { actions as activeChannelActions } from './activeChannel';

import errorMessage, { actions as errorMessageActions } from './errorMessage';

import userName from './userName';

export default combineReducers({
  messageSubmittingState,
  messages,
  channelAddingState,
  channelRemovingState,
  channelEditingState,
  channels,
  modalState,
  activeChannel,
  userName,
  errorMessage,
});

const actions = {
  ...messageSubmittingStateActions,
  ...messagesActions,
  ...channelAddingStateActions,
  ...channelRemovingStateActions,
  ...channelEditingStateActions,
  ...channelsActions,
  ...modalStateActions,
  ...activeChannelActions,
  ...errorMessageActions,
};

export { actions };
