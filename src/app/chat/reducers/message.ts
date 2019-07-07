import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IMessage } from '@ec-shared/models/message';
import { Action } from '@ec-core/actions';
import { ChatActions } from '../actions/message';

export interface MessageState extends EntityState<IMessage> {
  isLoaded: boolean;
}

export const message = (message: IMessage) => message.id;

export const messageAdapter: EntityAdapter<IMessage> = createEntityAdapter<IMessage>({
  selectId: message,

});


export const initialState = messageAdapter.getInitialState({
  isLoaded: false
});

export function messageReducer(state: MessageState = initialState, action: Action) {
  switch (action.type) {
    case ChatActions.SEND_MESSAGE:
      console.log(action.payload);
      return messageAdapter.addOne(action.payload, state);

    case ChatActions.FETCH_MESSAGE:
      console.log('message fetched');
      return {
        ...messageAdapter.addMany(action.payload, state),
        isLoaded:true
      };

    default:
      return state;
  }
}
export const _getIsMessagesLoaded = (state:MessageState) => state.isLoaded;
