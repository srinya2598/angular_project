import {_getEntities, _getIds, messageReducer, MessageState} from './message';
import {RootState} from '@ec-core/reducers';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {conversationReducer, ConversationState} from './conversation';

export interface State {
  message: MessageState,
  conversation: ConversationState
}

export interface MessageRootState extends RootState {
  message: State;
}

export const messageRootReducer = {
  message: messageReducer,
  conversation: conversationReducer
};
export const getMessageRootState = createFeatureSelector<State>('message');
export const getMessageState = createSelector(getMessageRootState, (state) => state.message);
export const getConversationState = createSelector(getMessageRootState, (state) => state.conversation);
export const getIds = createSelector(getMessageState, _getIds);
export const getEntities = createSelector(getMessageState, _getEntities);

