import {Action} from '@ec-core/actions';
import {IMessage} from '@ec-shared/models/message';
import {IRoom} from '@ec-shared/models/room';

export enum ChatActions {

  SEND_MESSAGE = '[chat] send message',
  FETCH_MESSAGE = '[chat] fetch message ',
  FETCH_ROOMS_SUCCESS = '[chat] fetch success',
  SELECTED_USER_ID = '[chat] select user id',
}

export class SendMessage implements Action {
  readonly type = ChatActions.SEND_MESSAGE;

  constructor(public payload: IMessage) {

  }
}

export class FetchMessage implements Action {
  readonly type = ChatActions.FETCH_MESSAGE;

  constructor(public payload: IMessage[]) {

  }

}

export class FetchSuccess implements Action {
  readonly type = ChatActions.FETCH_ROOMS_SUCCESS;

  constructor(public  payload: { room: IRoom[], roomId: string }) {

  }

}

export class SelectedUserId implements Action {
  readonly type = ChatActions.SELECTED_USER_ID;

  constructor(public payload: string ){

  }
}
