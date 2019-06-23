import {Action} from '@ec-core/actions';
import {IMessage} from '@ec-shared/models/message';
import {IRoom} from '@ec-shared/models/room';

export enum ChatActions {

  SEND_MESSAGE = '[chat] send message',
  FETCH_MESSAGE = '[chat] fetch message ',
  FETCH_SUCCESS = '[chat] fetch success',

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
  readonly type = ChatActions.FETCH_SUCCESS;

  constructor(public  payload: { room: IRoom[], roomId: string }) {

  }

}
