import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { dashboardRoutes } from './dashboard-routing';
import { SharedModule } from '../shared/shared.module';
import { ProductUploadComponent } from './component/product-upload/product-upload.component';
import { ProfileComponent } from './component/profile/profile.component';
import { HomeComponent } from './component/home/home.component';
import { CategoryComponent } from './component/category/category.component';
import { ProductComponent } from './component/product/product.component';
import { UserProductsComponent } from './component/user-products/user-products.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProductUploadComponent,
    ProfileComponent,
    HomeComponent,
    CategoryComponent,
    ProductComponent,
    UserProductsComponent,


  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(dashboardRoutes)
  ],
  entryComponents: [ProfileComponent]
})
export class DashboardModule {
}
