import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {IRoom} from '@ec-shared/models/room';
import {Action} from '@ec-core/actions';
import {ChatActions} from '../actions/message';

export interface RoomState extends EntityState <IRoom> {

}

export const room = (room: IRoom) => room.id;

export const adapter: EntityAdapter<IRoom> = createEntityAdapter<IRoom>({
  selectId: room
});

export const initialState = adapter.getInitialState();

export function roomReducer(state: RoomState = initialState, action: Action) {
  switch (action.type) {
    case ChatActions.FETCH_ROOMS_SUCCESS:
      console.log('room fetched success!');
      return adapter.addMany(action.payload.rooms, state);

    default:
      return state;
  }
}
