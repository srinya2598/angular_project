import {_getEntities, _getIds, messageReducer, MessageState} from './message';
import {RootState} from '@ec-core/reducers';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {_getConversation, _getIsLoaded, _getIsLoading, conversationReducer, ConversationState} from './conversation';
import {state} from '@angular/animations';

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
export const getIsLoading = createSelector(getConversationState, _getIsLoading);
export const getIsLoaded = createSelector(getConversationState, _getIsLoaded);
export const getConversationIds = createSelector(getConversationState, (state) => state.conversation);
export const getMessageIds = createSelector(getConversationState, _getConversation);
export const getMessage = createSelector(
  getConversationIds,
  getMessageIds,
  getEntities,
  (convid, msgid, entities) => {
  return msgid.map(id => entities[id]);
});
export function conversation(roomId: string) {
  return
}

