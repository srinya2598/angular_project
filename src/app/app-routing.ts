import { Routes } from '@angular/router';
import { BootstrapGuard } from './core/gaurds/bootstrap.guard';
import { BootstrapComponent } from './bootstrap/bootstrap.component';


export const rootRoutes: Routes = [
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
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  }
];

