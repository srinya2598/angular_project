import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { dashboardRoutes } from './dashboard-routing';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(dashboardRoutes)
  ]
})
export class DashboardModule { }
