import { combineReducers } from 'redux';

import messageSubmittingState, { actions as messageSubmittingStateActions, getMessageSubmittingState } from './messageSubmittingState';
import messages, { actions as messagesActions, getMessages, getMessagesForChannel } from './messages';

import channelAddingState, { actions as channelAddingStateActions, getChannelAddingState } from './channelAddingState';
import channelRemovingState, { actions as channelRemovingStateActions, getChannelRemovingState } from './channelRemovingState';
import channelEditingState, { actions as channelEditingStateActions, getChannelEditingState } from './channelEditingState';
import channels, { actions as channelsActions, getChannels } from './channels';

import modalState, { actions as modalStateActions, getModalState } from './modalState';

import activeChannel, { actions as activeChannelActions, getActiveChannel } from './activeChannel';

import errorMessage, { actions as errorMessageActions, getErrorMessage } from './errorMessage';

import userName, { getUserName } from './userName';

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

const selectors = {
  activeChannel: getActiveChannel,
  channelAddingState: getChannelAddingState,
  channelEditingState: getChannelEditingState,
  channelRemovingState: getChannelRemovingState,
  channels: getChannels,
  errorMessage: getErrorMessage,
  messages: getMessages,
  messagesForChannel: getMessagesForChannel,
  messageSubmittingState: getMessageSubmittingState,
  modalState: getModalState,
  userName: getUserName,
};

const getSelector = (type) => selectors[type];

export { getSelector };
