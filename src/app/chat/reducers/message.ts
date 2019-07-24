import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IMessage } from '@ec-shared/models/message';
import { Action } from '@ec-core/actions';
import { ChatActions } from '../actions/message';

export interface MessageState extends EntityState<IMessage> {
  isLoaded: boolean;
  favMessages: IMessage[];

}

export const message = (message: IMessage) => message.id;

export const messageAdapter: EntityAdapter<IMessage> = createEntityAdapter<IMessage>({
  selectId: message,

});


export const initialState = messageAdapter.getInitialState({
  isLoaded: false,
  favMessages: []
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
        isLoaded: true
      };
    case ChatActions.REMOVE_MESSAGE:
      let message = action.payload;
      return messageAdapter.removeOne(action.payload, state);
    default:
      return state;
    case ChatActions.SET_FAV_MESSAGE:
      const favMessage = action.payload;
      let oldMessages = state.favMessages || [];
      let newMessages = [...oldMessages, favMessage];
      return {
        ...messageAdapter.updateOne(favMessage.isFav, state),
        favMessages: newMessages
      };


  }


}

export const _getIsMessagesLoaded = (state: MessageState) => state.isLoaded;
export const _getFavMessages = (state: MessageState) => state.favMessages;
