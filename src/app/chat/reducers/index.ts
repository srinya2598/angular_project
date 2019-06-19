import { _getEntities, _getIds, messageReducer, MessageState } from './message';
import { RootState } from '@ec-core/reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { _getConversationMessageIds, _getIsLoaded, _getIsLoading, conversationReducer, ConversationState } from './conversation';

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


export const getConversationMessageIds = (state: State, convId: string) => _getConversationMessageIds(
  getConversationState(state),
  convId
);

export const getConversationMessages = (state: State, convId: string) => {
  const messageIds = getConversationMessageIds(state, convId);
  const entities = getEntities(state);
  return messageIds.map(id => entities[id]);
};


/**
 * Usage: Inside conversation.controller.ts-
 *
 * constructor(private store:Store<State>){
 * }
 *
 * getMessages(convId: string) {
 *     return this.store.select(state => getConversationMessages(state,convId));
 * }
 *
 **/
