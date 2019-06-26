import { Action } from '@ec-core/actions';
import { IMessage } from '@ec-shared/models/message';
import { IRoom } from '@ec-shared/models/room';

export enum ChatActions {

  SEND_MESSAGE = '[chat] send message',
  FETCH_MESSAGE = '[chat] fetch message ',
  FETCH_ROOMS_SUCCESS = '[chat] fetch success',
  SET_SELECTED_USER_ID = '[chat] set select user id',
  SET_SELECTED_ROOM_ID = '[chat] set select room id',
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

export class FetchRoomSuccess implements Action {
  readonly type = ChatActions.FETCH_ROOMS_SUCCESS;

  constructor(public  payload: IRoom[]) {

  }

}

export class SetSelectedUserId implements Action {
  readonly type = ChatActions.SET_SELECTED_USER_ID;

  constructor(public payload: string) {

  }
}

export class SetSelectedRoomId implements Action {
  readonly type = ChatActions.SET_SELECTED_ROOM_ID;

  constructor(public payload: string) {

  }
}
