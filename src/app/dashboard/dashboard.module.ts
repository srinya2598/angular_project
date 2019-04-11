import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { dashboardRoutes } from './dashboard-routing';
import { SharedModule } from '../shared/shared.module';
import { ProductUploadComponent } from './component/product-upload/product-upload.component';


@NgModule({
  declarations: [DashboardComponent,ProductUploadComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(dashboardRoutes)
  ]
})
export class DashboardModule { }
