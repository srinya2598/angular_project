import {Action} from '@ec-core/actions';
import {ChatActions} from '../actions/message';

export interface ConversationState {
  isLoading: boolean;
  isLoaded: boolean;
  conversation: {[convId:string]: string[]};
  rooms: string[];
  selectedUserId: string;
  selectedRoomId: string;
}

export const initialConversationState: ConversationState = {
  isLoading: false,
  isLoaded: false,
  conversation: {},
  rooms: [],
  selectedUserId: null,
  selectedRoomId: null,
};

  export function conversationReducer(state: ConversationState = initialConversationState, action: Action) {
    switch (action.type) {


      case ChatActions.SEND_MESSAGE:{
        const message = action.payload;
        let oldId = state.conversation[message.roomId];
        let newIds = [...oldId, message.id];
        return {
          ...state,
          conversation :{
            ...state.conversation,
            [message.roomId]: newIds
          }
        }
      }

      case ChatActions.FETCH_MESSAGE: {
        let tempState = {...state};
        let messages = action.payload;
        messages.forEach((m) => {
          const id = m.id;
          const roomId = m.roomId;
          let oldIds = tempState.conversation[roomId];
          let newIds = [...oldIds, id];
          tempState = {
            ...tempState,
            [roomId]: newIds
          }});
        return tempState;
      }

      case ChatActions.SET_SELECTED_USER_ID: {
        return{
          ...state,
          selectedUserId: action.payload
        };
      }

      case ChatActions.SET_SELECTED_ROOM_ID: {
        return{
          ...state,
          selectedRoomId: action.payload
        };
      }

      default:
        return state;
    }
  }

export const _getIsLoading = (state: ConversationState) => state.isLoading;
export const _getIsLoaded = (state: ConversationState) => state.isLoaded;
export const _getConversationMessageIds = (state: ConversationState, convId:string) => state.conversation[convId];
export const _getSelectedUserId = (state: ConversationState) => state.selectedUserId;
export const _getSelectedRoomId = (state: ConversationState) => state.selectedRoomId;
