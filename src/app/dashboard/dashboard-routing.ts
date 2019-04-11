import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ProductUploadComponent } from './component/product-upload/product-upload.component';

export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'upload-product',
        component: ProductUploadComponent
      }
    ]
  }
];
