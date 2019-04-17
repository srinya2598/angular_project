import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ProductUploadComponent } from './component/product-upload/product-upload.component';
import { ProfileContainerComponent } from './component/profile-container/profile-container.component';
import { DashboardCategoryComponent } from './component/dashboard-category/dashboard-category.component';
import { CategoryComponent } from './component/category/category.component';
import { ProductComponent } from './component/product/product.component';

export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: DashboardCategoryComponent
      },
      {
        path: 'upload-product',
        component: ProductUploadComponent
      },
      {
        path: 'profile',
        component: ProfileContainerComponent
      },
      {
        path: 'category',
        component: CategoryComponent
      },
      {
        path: 'product',
        component: ProductComponent
      }
    ]
  },

];
