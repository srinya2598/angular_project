import { IUser } from '@ec-shared/models/users';
import { Action } from '@ec-core/actions';

export enum AuthActions {
  LOGIN = '[Login] sent',
  LOGOUT = '[Logout] logout',
  LOGIN_SUCCESS = '[Login] success',
  LOGIN_FAILED = '[Login] failed',
  SIGNUP = '[SignUp] sent',
  SIGNUP_SUCCESS = '[SignUp] success',
  SIGNUP_FAILED = '[SignUp] failed',
  FETCH_USER = '[Login] fetch user',
  UPDATE_SENT = '[Update] sent',
  UPDATE_SUCCESS = '[Update] success',
  UPDATE_ERROR = '[Update] error',
}

export class Login implements Action {
  readonly type = AuthActions.LOGIN;
}

export class Logout implements Action {
  readonly type = AuthActions.LOGOUT;
}

export class LoginSuccess implements Action {
  readonly type = AuthActions.LOGIN_SUCCESS;
}

export class LoginFailed implements Action {
  readonly type = AuthActions.LOGIN_FAILED;
}

export class SignUp implements Action {
  readonly type = AuthActions.SIGNUP;
}

export class SignUpSuccess implements Action {
  readonly type = AuthActions.SIGNUP_SUCCESS;

  constructor(public payload: IUser) {
  }
}

export class SignUpFailed implements Action {
  readonly type = AuthActions.SIGNUP_FAILED;
}

export class FetchUser implements Action {
  readonly type = AuthActions.FETCH_USER;

  constructor(public payload: IUser) {
  }
}

export class UpdateSent implements Action {
  readonly type = AuthActions.UPDATE_SENT;
}

export class UpdateSuccess implements Action {
  readonly type = AuthActions.UPDATE_SUCCESS;

  constructor(public payload: IUser) {
  }
}

export class UpdateFailed implements Action {
  readonly type = AuthActions.UPDATE_ERROR;
}
