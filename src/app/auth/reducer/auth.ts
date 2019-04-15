import { AuthActions } from '../actions/auth';
import { Action } from '../actions';
import { IUser } from '../../shared/models/users';

export interface AuthState {
  loggedInUser: IUser;
  loggedInUserLoaded: boolean;
  isLoading: boolean;
  isLoggedIn: boolean;
  isBootsraped: boolean;
}

export const initialAuthState: AuthState = {
  loggedInUser: null,
  loggedInUserLoaded: false,
  isLoading: false,
  isLoggedIn: false,
  isBootsraped: false,
};


export function authReducer(state: AuthState = initialAuthState, action: Action) {
  {
    switch (action.type) {
      case AuthActions.LOGIN:
      case AuthActions.SIGNUP:
        return {
          ...state,
          isLoading: true
        };

      case AuthActions.LOGIN_SUCCESS: {
        return {
          ...state,
          isLoggedIn: true,
          isLoading: false
        };
      }
      case AuthActions.SIGNUP_SUCCESS:
        return {
          ...state,
          loggedInUser: action.payload,
          loggedInUserLoaded: true,
          isLoggedIn: true,
          isLoading: false
        };
      case AuthActions.LOGIN_FAILED:
      case AuthActions.SIGNUP_FAILED:
        return {
          ...state,
          isLoggedIn: false,
          isLoading: false
        };
      case AuthActions.FETCH_USER:
        return {
          ...state,
          loggedInUser: action.payload,
          loggedInUserLoaded: true,
          isBootsraped: true
        };

      case AuthActions.UPDATE_SENT:
        return {
          ...state,
          isLoading: true
        };
      case AuthActions.UPDATE_SUCCESS:
        return {
          ...state,
          isLoading: false,
          loggedInUser: action.payload
        };
      case AuthActions.UPDATE_ERROR:
        return {
          ...state,
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
export const _getIsBootstraped = (state: AuthState) => state.isBootsraped;
export const _getIsLoggedInUserLoaded = (state: AuthState) => state.loggedInUserLoaded;

