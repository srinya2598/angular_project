import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {IMessage} from '@ec-shared/models/message';
import {Action} from '@ec-core/actions';
import {ChatActions} from '../actions/message';

export interface MessageState extends EntityState<IMessage> {

}

export const message = (message: IMessage) => message.id;

export const adapter: EntityAdapter<IMessage> = createEntityAdapter<IMessage>({
  selectId: message,
  sortComparer: sortByTimeStamp
});

export function sortByTimeStamp(message1: IMessage, message2: IMessage): number {
  return message1.timestamp - message2.timestamp;
}

export const initialState = adapter.getInitialState();

export function messageReducer(state: MessageState = initialState, action: Action) {
  switch (action.type) {
    case ChatActions.SEND_MESSAGE:
      console.log(action.payload);
      return adapter.addOne(action.payload, state);

    case ChatActions.FETCH_MESSAGE:
      console.log('message fetched');
      return adapter.addMany(action.payload.messages, state);

    default:
      return state;
  }

}

export const _getEntities = (state: MessageState) => state.entities;
export const _getIds = (state: MessageState) => state.ids;
export const _getSelectedMesage = (state: MessageState, id: string) => state.entities[id];
