import {Action} from '@ec-core/actions';
import {ChatActions} from '../actions/message';

export interface RoomMessageState {
  ids: { [convId: string]: string[] };
  selectedUserId: string;
  selectedRoomId: string;
}

export const initialRoomMessagesState: RoomMessageState = {
  ids: {},
  selectedUserId: null,
  selectedRoomId: null
};

export function roomMessagesReducer(state: RoomMessageState = initialRoomMessagesState, action: Action) {
  switch (action.type) {


    case ChatActions.SEND_MESSAGE: {
      const message = action.payload;
      let oldId = state.ids[message.roomId] || [];
      let newIds = [...oldId, message.id];
      return {
        ...state,
        ids: {
          ...state.ids,
          [message.roomId]: newIds
        }
      };
    }


    case ChatActions.SET_SELECTED_USER_ID: {
      return {
        ...state,
        selectedUserId: action.payload
      };
    }
    case ChatActions.SET_SELECTED_ROOM_ID: {
      return {
        ...state,
        selectedRoomId: action.payload
      };
    }
    case ChatActions.FETCH_MESSAGE : {
      let tempState = {...state};
      let messages = action.payload;

      console.log(messages);
      messages.forEach((m) => {
        const id = m.id;
        const roomId = m.roomId;
        let oldIds = tempState.ids[roomId] || [];
        let newIds = [...oldIds, id];
        tempState = {
          ...tempState,
          ids: {...tempState.ids, [roomId]: newIds}
        };
      });
      return tempState;
    }
    case ChatActions.REMOVE_MESSAGE:
      const messageId = action.payload.id;
      let roomId = state.selectedRoomId;
      let messages = state.ids[roomId];
      messages = messages.filter(item => item !== messageId);
      return {
        ...state,
        ids[roomId] = messages
  };

default:
  return state;
}
}


export const _getRoomMessageIds = (state: RoomMessageState, convId: string) => state.ids[convId] || [];
export const _getSelectedUserId = (state: RoomMessageState) => state.selectedUserId;
export const _getSelectedRoomId = (state: RoomMessageState) => state.selectedRoomId;
