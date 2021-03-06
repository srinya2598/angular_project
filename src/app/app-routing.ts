import { Routes } from '@angular/router';
import { BootstrapGuard } from './core/guards/bootstrap.guard';
import { BootstrapComponent } from './bootstrap/bootstrap.component';
import { DashboardGuard } from './core/guards/dashboard-guard';
import { PagenotfoundComponent } from '@ec-shared/components/pagenotfound/pagenotfound.component';


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
    path: '**',
    component: PagenotfoundComponent
  }
];

