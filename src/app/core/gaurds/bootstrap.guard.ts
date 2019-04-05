import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class BootstrapGuard implements CanActivate {
  constructor(private router: Router,private apiService:ApiService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.apiService.getItem('uid')) {
      this.router.navigate(['/login']);
      return false;
    } else {
      this.router.navigate(['/dashboard']);
    }
    return true;

  }
}
