import { IMessage } from '@ec-shared/models/message';
import { Action } from '@ec-core/actions';
import { ChatActions } from '../actions/message';


export interface SearchMessageState {
  searchMessages: IMessage[],
  searchKeyword: string
}

export const initialState: SearchMessageState = {
  searchMessages: [],
  searchKeyword: null
};

export function searchMessageReducer(state: SearchMessageState = initialState, action: Action): SearchMessageState {
  switch (action.type) {
    case ChatActions.SET_SEARCH_KEYWORD:
      return {
        ...state,
        searchKeyword: action.payload
      };

    case ChatActions.SET_SEARCH_MESSAGES:
      return {
        ...state,
        searchMessages: action.payload || []
      };

    case ChatActions.RESET_SEARCH_MESSAGES:
      return {
        ...state,
        searchMessages: [],
        searchKeyword: null
      };
    default:
      return state;
  }
}

export const _getSearchKeyword = (state: SearchMessageState) => state.searchKeyword;
export const _getSearchMessages = (state: SearchMessageState) => state.searchMessages;
