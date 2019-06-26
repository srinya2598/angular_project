import { _getEntities, _getIds, messageReducer, MessageState } from './message';
import { RootState } from '@ec-core/reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  _getRoomMessageIds,
  _getIsLoaded,
  _getIsLoading,
  _getSelectedRoomId,
  _getSelectedUserId,
  roomMessagesReducer,
  RoomMessageState
} from './room-messages';

export interface State {
  message: MessageState,
  roomMessages: RoomMessageState
}

export interface MessageRootState extends RootState {
  message: State;
}

export const messageRootReducer = {
  message: messageReducer,
  roomMessages: roomMessagesReducer
};
export const getMessageRootState = createFeatureSelector<State>('message');
export const getMessageState = createSelector(getMessageRootState, (state) => state.message);
export const getRoomMessageState = createSelector(getMessageRootState, (state) => state.roomMessages);
export const getIds = createSelector(getMessageState, _getIds);
export const getEntities = createSelector(getMessageState, _getEntities);
export const getIsLoading = createSelector(getRoomMessageState, _getIsLoading);
export const getIsLoaded = createSelector(getRoomMessageState, _getIsLoaded);
export const getSelectedUserId = createSelector(getRoomMessageState, _getSelectedUserId);
export const getSelectedRoomId = createSelector(getConversationState, _getSelectedRoomId);


export const getRoomMessageIds = (state: State, convId: string) => _getRoomMessageIds(
  getRoomMessageState(state),
  convId
);

export const getRoomMessages = (state: State, convId: string) => {
  const messageIds = getRoomMessageIds(state, convId);
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
 *     return this.store.select(state => getRoomMessages(state,convId));
 * }
 *
 **/
