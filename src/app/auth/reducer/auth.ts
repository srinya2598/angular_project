import {AuthActions} from '../actions/auth';
import {Action} from '../actions';
import {IUser} from '../../shared/models/users';

export interface AuthState {
  loggedInUser: IUser;
  isLoading: boolean;
  isLoggedIn: boolean;
  isBootsraped: boolean;
}

export const initialAuthState: AuthState = {
  loggedInUser: null,
  isLoading: false,
  isLoggedIn: false,
  isBootsraped: false,
};


export function authReducer(state: AuthState = initialAuthState, action: Action) {
  {
    switch (action.type) {
      case AuthActions.LOGIN:
        return {
          ...state,
          loggedInUser: action.payload,
          isLoggedIn: true,
          isLoading: false,
          isBootsraped: true
        };

      case AuthActions.LOGIN_SUCCESS:
        return {
          ...state,
          loggedInUser: action.payload,
          isLoggedIn: true,
          isLoading: false
        };
      case AuthActions.LOGIN_FAILED:
        return {
          ...state,
          isLoggedIn: false,
          isLoading: false
        };
      default:
        return state;
    }
  }


}

export const _getLoggedInUser = (state: AuthState) => state.loggedInUser;
export const _getIsLoading = (state: AuthState) => state.isLoading;
export const _getIsLoggedIn = (state: AuthState) => state.isLoggedIn;

