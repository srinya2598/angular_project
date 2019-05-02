import { Injectable, NgZone } from '@angular/core';
import { getIsLoading, getIsLoggedIn, getLoggedInUser, State } from '../../auth/reducer';
import { Store } from '@ngrx/store';
import { ApiService } from '../services/api.service';
import { catchError, filter, finalize, map, switchMap, take } from 'rxjs/operators';
import { IUser } from '../../shared/models/users';
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
import { Constants } from '../../shared/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthController {
  downloadUrlProfile: BehaviorSubject<string>;
  uploadPercentage: BehaviorSubject<number>;

  constructor(private store: Store<State>,
              private apiService: ApiService,
              private router: Router,
              private zone: NgZone,
              private notificationService: NotificationService) {
    this.downloadUrlProfile = new BehaviorSubject('null');
    this.uploadPercentage = new BehaviorSubject(0);
  }

  signUp(userData) {
    if (!userData) {
      return;
    }
    let user: IUser;
    this.store.dispatch(new SignUp());
    const email = userData.email;
    const password = userData.password;
    this.apiService.signup(email, password).pipe(
      switchMap((res) => {
        this.store.dispatch(new SignUp());
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
        this.store.dispatch(new SignUpSuccess(user));
        this.apiService.setItem(Constants.USER_UID, user.id);
        this.zone.run(() => {
          this.router.navigate(['']);
        });
      },
      (error) => {
        this.notificationService.error(error);
        this.store.dispatch(new SignUpFailed());
      }
    );
  }

  login(userData: { email: string, password: string }) {
    if (!userData) {
      return;
    }
    const isLoggedIn$ = this.store.select(getIsLoggedIn);
    const isLoading$ = this.store.select(getIsLoading);
    combineLatest(isLoggedIn$, isLoading$).pipe(
      take(1),
      map(([isLoggedIn, isLoading]) => isLoggedIn || isLoading),
      filter(res => !res),
      switchMap(() => {
        this.store.dispatch(new Login());
        return this.apiService.login(userData);
      }),
      catchError((error) => throwError(error.message))
    ).subscribe(res => {
        console.log('[Auth Controller] Inside login');
        this.notificationService.success('You are logged in successfully!!');
        //  Load the data of the user form database in bootstrap component
        this.store.dispatch(new LoginSuccess());
        this.apiService.setItem(Constants.USER_UID, res.user.uid);
        this.zone.run(() => {
          this.router.navigate(['']);
        });
      },
      (error) => {
        this.notificationService.error(error);
        console.log(error);
        this.store.dispatch(new LoginFailed());
      });

  }

  googleLogin(action: string) {
    let user: IUser;
    if (action == Constants.LOGIN_WITH_GOOGLE) {
      this.store.select(getIsLoggedIn).pipe(
        take(1),
        filter(res => !res),
        switchMap(() => {
          this.store.dispatch(new Login());
          return this.apiService.signInWithGoogle();
        })
      ).subscribe((res) => {
        this.notificationService.success('You are logged in successfully!!');
        this.store.dispatch(new LoginSuccess());
        this.apiService.setItem(Constants.USER_UID, res.user.uid);
        this.zone.run(() => {
          this.router.navigate(['']);
        });
      }, (error) => {
        this.notificationService.error(error);
        this.store.dispatch(new LoginFailed());
      });
    } else {
      this.apiService.signInWithGoogle().pipe(
        switchMap(res => {
          this.store.dispatch(new SignUp());
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
          this.store.dispatch(new SignUpSuccess(user));
          this.apiService.setItem(Constants.USER_UID, user.id);
          this.zone.run(() => {
            this.router.navigate(['']);
          });
        },
        (error) => {
          console.log(error);
          this.notificationService.error('error');
          this.store.dispatch(new SignUpFailed());
        });
    }
  }

  updateUser(id: string, user: IUser) {
    this.store.select(getIsLoading).pipe(
      take(1),
      filter(res => !res),
      switchMap(() => {
        this.store.dispatch(new UpdateSent());
        return this.apiService.setUserDetails(id, user);
      }),
      catchError(error => throwError(error.message))
    ).subscribe(() => {
        this.notificationService.success('Profile updated successfully');
        this.store.dispatch(new UpdateSuccess(user));
      },
      (error) => {
        this.notificationService.error(error);
        this.store.dispatch(new UpdateFailed());
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
    return this.store.select(getIsLoading);
  }

  getUser() {
    return this.store.select(getLoggedInUser);
  }

  logout() {
    this.apiService.removeItem(Constants.USER_UID);
    this.store.dispatch(new Logout());
    this.router.navigate(["login"]);
  }
}
