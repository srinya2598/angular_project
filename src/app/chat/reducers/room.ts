import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IRoom } from '@ec-shared/models/room';
import { Action } from '@ec-core/actions';
import { ChatActions } from '../actions/message';

export interface RoomState extends EntityState <IRoom> {
  isRoomsLoaded: boolean;
  isRoomsLoading: boolean;
}

export const room = (room: IRoom) => room.id;

export const roomAdapter: EntityAdapter<IRoom> = createEntityAdapter<IRoom>({
  selectId: room
});

export const initialState = roomAdapter.getInitialState({
  isRoomsLoaded: false,
  isRoomsLoading: false
});

export function roomReducer(state: RoomState = initialState, action: Action) {
  switch (action.type) {
    case ChatActions.FETCH_ROOMS:
      return {
        ...state,
        isRoomsLoading: true
      };

    case ChatActions.FETCH_ROOMS_SUCCESS:
      return {
        ...roomAdapter.addMany(action.payload.rooms, state),
        isRoomsLoaded: true,
        isRoomsLoading: false,
      };

    case ChatActions.CREATE_ROOM:
      return roomAdapter.addOne(action.payload, state);

    default:
      return state;
  }
}

export const _getIsRoomsLoading = (state: RoomState) => state.isRoomsLoading;
export const _getIsRoomsLoaded = (state: RoomState) => state.isRoomsLoaded;
