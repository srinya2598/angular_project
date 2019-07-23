import {
  _getIsMessagesLoaded,
  messageAdapter,
  messageReducer,
  MessageState
} from './message';
import {RootState} from '@ec-core/reducers';
import {
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import {
  _getFavMessages, _getFavMessagesIds,
  _getRoomMessageIds,
  _getSelectedRoomId,
  _getSelectedUserId,
  roomMessagesReducer,
  RoomMessageState
} from './room-messages';
import {
  _getIsRoomsLoaded,
  _getIsRoomsLoading,
  roomAdapter,
  roomReducer,
  RoomState
} from './room';
import {
  _getSearchKeyword,
  _getSearchMessages,
  searchMessageReducer,
  SearchMessageState
} from './search-message';

export interface State {
  message: MessageState,
  roomMessages: RoomMessageState,
  rooms: RoomState,
  searchMessage: SearchMessageState
}

export interface MessageRootState extends RootState {
  message: State;
}

export const messageRootReducer = {
  message: messageReducer,
  roomMessages: roomMessagesReducer,
  rooms: roomReducer,
  searchMessage: searchMessageReducer
};

export const getMessageRootState = createFeatureSelector<State>('message');


// Message Selectors


export const getMessageState = createSelector(
  getMessageRootState,
  (state) => state.message
);

export const {
  selectIds: getMessageIds,
  selectEntities: getMessageEntities,
  selectAll: getAllMessages,
  selectTotal: getTotalMessages
} = messageAdapter.getSelectors(getMessageState);

export const getIsMessagesLoaded = createSelector(
  getMessageState,
  _getIsMessagesLoaded
);

// Room-Message Selectors
export const getRoomMessageState = createSelector(
  getMessageRootState,
  (state) => state.roomMessages
);

export const getSelectedUserId = createSelector(
  getRoomMessageState,
  _getSelectedUserId
);
export const getSelectedRoomId = createSelector(
  getRoomMessageState,
  _getSelectedRoomId
);

// Rooms Selectors

export const getRoomState = createSelector(
  getMessageRootState,
  (state) => state.rooms
);

export const {
  selectIds: getRoomIds,
  selectEntities: getRoomEntities,
  selectAll: getAllRooms,
  selectTotal: getTotalRooms
} = roomAdapter.getSelectors(getRoomState);

export const getIsRoomsLoaded = createSelector(
  getRoomState,
  _getIsRoomsLoaded
);
export const getIsRoomsLoading = createSelector(
  getRoomState,
  _getIsRoomsLoading
);
export const getRoomsList = (state: State) => getAllRooms(state);
export const getUserRoomIds = (state: State) => getRoomIds(state) || [];
export const getRoomMessageIds = (state: State, convId: string) => _getRoomMessageIds(
  getRoomMessageState(state),
  convId
);


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

export const getRoomMessages = (state: State, convId: string) => {
  const messageIds = getRoomMessageIds(state, convId);
  const entities = getMessageEntities(state);
  return messageIds.map(id => entities[id]);
};
export const getFavMessagesIds = createSelector(getRoomMessageState,
  _getFavMessagesIds);

export const getFavMessages = createSelector(getRoomMessageState,
  _getFavMessages
  );

// Search-Message selectors

export const getSearchMessageState = createSelector(
  getMessageRootState,
  (state) => state.searchMessage
);

export const getSearchKeyword = createSelector(
  getSearchMessageState,
  _getSearchKeyword
);

export const getSearchMessages = createSelector(
  getSearchMessageState,
  _getSearchMessages
);

