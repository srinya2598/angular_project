import {BootstrapComponent} from '../bootstrap/bootstrap.component';
import {Routes} from '@angular/router';
import {BootstrapGuard} from '../core/gaurds/bootstrap.guard';

export const appRoutesL: Routes = [
  {
    path: '',
    component: BootstrapComponent,
    canActivate: [BootstrapGuard]
  },
  {
    path: '',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: 'login',
    loadChildren: '.auth/login/login.module#LoginModule'
  }
];
