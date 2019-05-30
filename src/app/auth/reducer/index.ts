import {
  _getIsBootstrapped,
  _getIsLoading,
  _getIsLoggedIn,
  _getIsLoggedInUserLoaded,
  _getLoggedInUser,
  authReducer,
  AuthState
} from './auth';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import { RootState } from '@ec-core/reducers';

export interface State {
  auth: AuthState;
}

export interface AuthRootState extends RootState {
  auth: State;
}

export const authRootReducer = {
  auth: authReducer

};

export const getAuthRootState = createFeatureSelector<State>('auth');
export const getAuthState = createSelector(getAuthRootState, (state) => state.auth);
export const getLoggedInUser = createSelector(getAuthState, _getLoggedInUser);
export const getIsLoading = createSelector(getAuthState, _getIsLoading);
export const getIsBootstrapped = createSelector(getAuthState, _getIsBootstrapped);
export const getIsLoggedIn = createSelector(getAuthState, _getIsLoggedIn);
export const getIsLoggedInUserLoaded = createSelector(getAuthState, _getIsLoggedInUserLoaded);
