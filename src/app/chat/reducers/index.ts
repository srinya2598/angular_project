import { messageAdapter, messageReducer, MessageState } from './message';
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
import { _getIsRoomsLoaded, _getIsRoomsLoading, roomReducer, RoomState } from './room';

export interface State {
  message: MessageState,
  roomMessages: RoomMessageState,
  rooms: RoomState
}

export interface MessageRootState extends RootState {
  message: State;
}

export const messageRootReducer = {
  message: messageReducer,
  roomMessages: roomMessagesReducer,
  rooms:roomReducer
};

export const getMessageRootState = createFeatureSelector<State>('message');


// Message Selectors


export const getMessageState = createSelector(getMessageRootState, (state) => state.message);

export const {
  selectIds: getMessageIds,
  selectEntities: getMessageEntities,
  selectAll: getAllMessages,
  selectTotal: getTotalMessages
} = messageAdapter.getSelectors(getMessageState);

// Room-Message Selectors
export const getRoomMessageState = createSelector(getMessageRootState, (state) => state.roomMessages);

export const getIsLoading = createSelector(getRoomMessageState, _getIsLoading);
export const getIsLoaded = createSelector(getRoomMessageState, _getIsLoaded);
export const getSelectedUserId = createSelector(getRoomMessageState, _getSelectedUserId);
export const getSelectedRoomId = createSelector(getRoomMessageState, _getSelectedRoomId);

// Rooms Selectors

export const getRoomState = createSelector(getMessageRootState, (state) => state.rooms);

export const getIsRoomsLoaded = createSelector(getRoomState,_getIsRoomsLoaded);
export const getIsRoomsLoading = createSelector(getRoomState,_getIsRoomsLoading);



export const getRoomMessageIds = (state: State, convId: string) => _getRoomMessageIds(
  getRoomMessageState(state),
  convId
);

export const getRoomMessages = (state: State, convId: string) => {
  const messageIds = getRoomMessageIds(state, convId);
  const entities = getMessageEntities(state);
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
