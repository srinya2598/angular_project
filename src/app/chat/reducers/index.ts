import {_getEntities, _getIds, _getSelectedMessage, messageReducer, MessageState} from './message';
import {RootState} from '@ec-core/reducers';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface State {
  message: MessageState
}

export interface MessageRootState extends RootState {
  message: State;
}

export const messageRootReducer = {
  message: messageReducer,
};
export const getMessageRootState = createFeatureSelector<State>('message');
export const getMessageState = createSelector(getMessageRootState, (state) => state.message);
export const getIds = createSelector(getMessageState, _getIds);
export const getEntities = createSelector(getMessageState, _getEntities);
export const getSelectedMessage = (state: State, id: string) => _getSelectedMessage(getMessageState(state), id);
