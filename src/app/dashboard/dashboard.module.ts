import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { dashboardRoutes } from './dashboard-routing';
import { SharedModule } from '../shared/shared.module';
import { ProductUploadComponent } from './component/product-upload/product-upload.component';
import { ProfileComponent } from './component/profile-container/profile/profile.component';
import { ProfileContainerComponent } from './component/profile-container/profile-container.component';
import { ProductComponent } from './component/product/product.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProductUploadComponent,
    ProfileComponent,
    ProfileContainerComponent,
    ProductComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(dashboardRoutes)
  ],
  entryComponents: [ProfileComponent]
})
export class DashboardModule {
}
