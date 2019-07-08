import {Action} from '@ec-core/actions';
import {IMessage} from '@ec-shared/models/message';
import {IRoom} from '@ec-shared/models/room';

export enum ChatActions {

  SEND_MESSAGE = '[chat] send message',
  FETCH_MESSAGE = '[chat] fetch message',
  FETCH_ROOMS = '[chat] fetch rooms',
  FETCH_ROOMS_SUCCESS = '[chat] fetch rooms success',
  FETCH_ROOMS_FAILED = '[chat] fetch rooms failed',
  SET_SELECTED_USER_ID = '[chat] set select user id',
  SET_SELECTED_ROOM_ID = '[chat] set select room id',
  CREATE_ROOM = '[chat] create room',
  REMOVE_MESSAGE = '[chat] remove message',
  SET_SELECTED_MESSAGE = '[chat] set selected message',

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

export class FetchRooms implements Action {
  readonly type = ChatActions.FETCH_ROOMS;
}

export class FetchRoomSuccess implements Action {
  readonly type = ChatActions.FETCH_ROOMS_SUCCESS;

  constructor(public  payload: IRoom[]) {
  }
}

export class FetchRoomsFailed implements Action {
  readonly type = ChatActions.FETCH_ROOMS_FAILED;
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

export class CreateRoom implements Action {
  readonly type = ChatActions.CREATE_ROOM;

  constructor(public payload: IRoom) {
  }
}

export class RemoveMessage implements Action {
  readonly type = ChatActions.REMOVE_MESSAGE;

  constructor(public payload: IMessage) {

  }
}

export class SetSelectedMessage implements Action {
  readonly type = ChatActions.SET_SELECTED_MESSAGE;

  constructor( public payload: string ) {

  }

}
