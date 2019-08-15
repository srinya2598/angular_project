import { Injectable, NgZone } from '@angular/core';
import { getIsLoading, getIsLoggedIn, getLoggedInUser, State } from '../../auth/reducer';
import { Store } from '@ngrx/store';
import { ApiService } from '../services/api.service';
import { catchError, filter, finalize, map, switchMap, take } from 'rxjs/operators';
import { IUser } from '@ec-shared/models/users';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import {
  Login,
  LoginFailed,
  LoginSuccess, Logout,
  SignUp,
  SignUpFailed,
  SignUpSuccess,
  UpdateFailed,
  UpdateSent,
  UpdateSuccess
} from '../../auth/actions/auth';
import { BehaviorSubject, combineLatest, Observable, throwError } from 'rxjs';
import { Constants, StatusType } from '@ec-shared/utils/constants';
import { AuthState } from '../../auth/reducer/auth';
import { getUnreadCount } from '../../chat/reducers';
import { SetUnreadCount } from '../../chat/actions/message';


@Injectable({
  providedIn: 'root'
})
export class AuthController {
  downloadUrlProfile: BehaviorSubject<string>;
  uploadPercentage: BehaviorSubject<number>;

  constructor(private authStore: Store<AuthState>,
              private apiService: ApiService,
              private router: Router,
              private zone: NgZone,
              private notificationService: NotificationService,
              private chatStore: Store<State>
  ) {
    this.downloadUrlProfile = new BehaviorSubject('null');
    this.uploadPercentage = new BehaviorSubject(0);
  }

  signUp(userData) {
    if (!userData) {
      return;
    }
    let user: IUser;
    this.authStore.dispatch(new SignUp());
    const email = userData.email;
    const password = userData.password;
    this.apiService.signup(email, password).pipe(
      switchMap((res) => {
        this.authStore.dispatch(new SignUp());
        user = {
          id: res.user.uid,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          country: userData.country,
          phoneNo: userData.phoneNo.toString()
        };
        return this.apiService.setUserDetails(res.user.uid, user);
      }),
      catchError(error => throwError(error.message))
    ).subscribe(res => {
        this.notificationService.success('You are logged in successfully!!');
        this.authStore.dispatch(new SignUpSuccess(user));
        this.apiService.setItem(Constants.USER_UID, user.id);
        this.setUserStatusOnline().subscribe(() => {
        });
        this.zone.run(() => {
          this.router.navigate(['']);
        });
      },
      (error) => {
        this.notificationService.error(error);
        this.authStore.dispatch(new SignUpFailed());
      }
    );
  }

  login(userData: { email: string, password: string }) {
    if (!userData) {
      return;
    }
    const isLoggedIn$ = this.authStore.select(getIsLoggedIn);
    const isLoading$ = this.authStore.select(getIsLoading);
    combineLatest(isLoggedIn$, isLoading$).pipe(
      take(1),
      map(([isLoggedIn, isLoading]) => isLoggedIn || isLoading),
      filter(res => !res),
      switchMap(() => {
        this.authStore.dispatch(new Login());
        return this.apiService.login(userData);
      }),
      catchError((error) => throwError(error.message))
    ).subscribe(res => {
        console.log('[Auth Controller] Inside login');
        this.notificationService.success('You are logged in successfully!!');
        //  Load the data of the user form database in bootstrap component
        this.authStore.dispatch(new LoginSuccess());
        this.apiService.setItem(Constants.USER_UID, res.user.uid);
        this.setUserStatusOnline().subscribe(() => {
        });
        this.zone.run(() => {
          this.router.navigate(['']);
        });
      },
      (error) => {
        this.notificationService.error(error);
        console.log(error);
        this.authStore.dispatch(new LoginFailed());
      });

  }

  googleLogin(action: string) {
    let user: IUser;
    if (action == Constants.LOGIN_WITH_GOOGLE) {
      this.authStore.select(getIsLoggedIn).pipe(
        take(1),
        filter(res => !res),
        switchMap(() => {
          this.authStore.dispatch(new Login());
          return this.apiService.signInWithGoogle();
        })
      ).subscribe((res) => {
        this.notificationService.success('You are logged in successfully!!');
        this.authStore.dispatch(new LoginSuccess());
        this.apiService.setItem(Constants.USER_UID, res.user.uid);
        this.setUserStatusOnline().subscribe(() => {
        });
        this.zone.run(() => {
          this.router.navigate(['']);
        });
      }, (error) => {
        this.notificationService.error(error);
        this.authStore.dispatch(new LoginFailed());
      });
    } else {
      this.apiService.signInWithGoogle().pipe(
        switchMap(res => {
          this.authStore.dispatch(new SignUp());
          user = {
            firstName: res.additionalUserInfo.profile['given_name'],
            lastName: res.additionalUserInfo.profile['family_name'],
            email: res.additionalUserInfo.profile['email'],
            country: '',
            id: res.user.uid,
            phoneNo: ''
          };
          return this.apiService.setUserDetails(res.user.uid, user);
        }),
        catchError((error) => throwError(error.message))
      ).subscribe(res => {
          this.notificationService.success('You are logged in successfully!!');
          this.authStore.dispatch(new SignUpSuccess(user));
          this.apiService.setItem(Constants.USER_UID, user.id);
          this.zone.run(() => {
            this.router.navigate(['']);
          });
        },
        (error) => {
          console.log(error);
          this.notificationService.error('error');
          this.authStore.dispatch(new SignUpFailed());
        });
    }
  }

  updateUser(id: string, user: IUser) {
    this.authStore.select(getIsLoading).pipe(
      take(1),
      filter(res => !res),
      switchMap(() => {
        this.authStore.dispatch(new UpdateSent());
        return this.apiService.setUserDetails(id, user);
      }),
      catchError(error => throwError(error.message))
    ).subscribe(() => {
        this.notificationService.success('Profile updated successfully');
        this.authStore.dispatch(new UpdateSuccess(user));
      },
      (error) => {
        this.notificationService.error(error);
        this.authStore.dispatch(new UpdateFailed());
      });
  }


  uploadProfileImage(file: File): BehaviorSubject<any>[] {
    const fileName = file.name;
    const ref = this.apiService.getProfileImageRef(fileName);
    const task = this.apiService.uploadProfileImage(fileName, file, ref);
    task.percentageChanges().subscribe(percent => this.uploadPercentage.next(percent));
    task.snapshotChanges().pipe(
      finalize(() => ref.getDownloadURL().subscribe(url => this.downloadUrlProfile.next(url)))
    ).subscribe(null, (error) => {
      this.notificationService.error(error.message);
    });
    return [this.uploadPercentage, this.downloadUrlProfile];
  }


  getIsLoading(): Observable<boolean> {
    return this.authStore.select(getIsLoading);
  }

  getUser() {
    return this.authStore.select(getLoggedInUser);
  }

  logout() {
    this.setUserStatusOffline().subscribe(() => {
    });
    this.setUnreadCount().subscribe((res) => {
     console.log('[set unread count]');
    });
    this.apiService.removeItem(Constants.USER_UID);
    this.authStore.dispatch(new Logout());
    this.router.navigate(['login']);
  }

  setUserStatusOnline() {
    const userId = this.apiService.getItem(Constants.USER_UID);
    return this.apiService.setUserStatus(userId, StatusType.ONLINE);
  }

  setUserStatusOffline() {
    const userId = this.apiService.getItem(Constants.USER_UID);
    return this.apiService.setUserStatus(userId, StatusType.OFFLINE);
  }

  setUnreadCount() {
    const userId = this.apiService.getItem(Constants.USER_UID);
    let unreadCount;
    this.chatStore.select(getUnreadCount).subscribe(res => unreadCount = res);
    return this.apiService.setUnreadCount(userId, unreadCount);
  }


}
