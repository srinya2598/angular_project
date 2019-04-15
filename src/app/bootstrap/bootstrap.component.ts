import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getIsLoggedInUserLoaded, State } from '../auth/reducer';
import { take } from 'rxjs/operators';
import { ApiService } from '../core/services/api.service';
import { Constants } from '../shared/utils/constants';
import { Router } from '@angular/router';
import { FetchUser } from '../auth/actions/auth';
import { IUser } from '../shared/models/users';

@Component({
  selector: 'app-bootstrap',
  template: `
    <ngx-loading [show]="true"></ngx-loading>`
})
export class BootstrapComponent implements OnInit {

  constructor(private store: Store<State>, private apiService: ApiService, private router: Router) {
  }

  ngOnInit() {
    let isLoggedInUserLoaded: boolean;
    this.store.select(getIsLoggedInUserLoaded).pipe(take(1)).subscribe(res => isLoggedInUserLoaded = res);
    if (!isLoggedInUserLoaded) {
      const uid = this.apiService.getItem(Constants.USER_UID);
      this.apiService.getUserDetails(uid).pipe(take(1)).subscribe((res:IUser) => {
        this.store.dispatch(new FetchUser(res));
        this.router.navigate(['dashboard']);
      });
    } else {
      this.router.navigate(['dashboard']);
    }
  }

}
