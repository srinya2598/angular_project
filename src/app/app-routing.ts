import { Routes } from '@angular/router';
import { BootstrapGuard } from './core/gaurds/bootstrap.guard';
import { BootstrapComponent } from './bootstrap/bootstrap.component';
import { DashboardGuard } from './core/gaurds/dashboard-guard';
import {ChatGuard} from '@ec-core/gaurds/chat.guard';


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
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canActivate: [DashboardGuard]
  },
  {
    path: '',
    loadChildren: './chat/chat.module#ChatModule',
    canActivate: [ChatGuard]
  }
];

