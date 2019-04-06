import {Action} from './index';

export enum AuthActions {
  LOGIN = '[Login] sent',
  LOGIN_SUCCESS = '[Login] success',
  LOGIN_FAILED = '[Login] failed'
}

export class Login implements Action {
  readonly type = AuthActions.LOGIN;
}

export class LoginSuccess implements Action {
  readonly type = AuthActions.LOGIN_SUCCESS;

  constructor(public payload: any) {

  }
}

export class LoginFailed implements Action {
  readonly type = AuthActions.LOGIN_FAILED;
}
