import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { Constants } from '@ec-shared/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class ChatGuard implements CanActivate {
  constructor(private router: Router, private apiService: ApiService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.apiService.getItem(Constants.USER_UID)) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
