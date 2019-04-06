import {_getIsLoading, _getIsLoggedIn, _getLoggedInUser, authReducer, AuthState} from './auth';
import {RootState} from '../../root-reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

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
export const getIsLoggedIn = createSelector(getAuthState, _getIsLoggedIn);
