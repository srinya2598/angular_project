import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { getIsBootstrapped, State } from '../../auth/reducer';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {
  constructor(private router: Router, private store: Store<State>) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(getIsBootstrapped).pipe(
      take(1),
      map((res) => {
        if (!res) {
          this.router.navigate(['']);
        }
        return res;
      })
    );
  }
}
