import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ProductUploadComponent } from './component/product-upload/product-upload.component';
import { HomeComponent } from './component/home/home.component';
import { CategoryComponent } from './component/category/category.component';
import { ProductComponent } from './component/product/product.component';
import { ConversationComponent } from './component/conversation/conversation.component';
import { UserProductsComponent } from './component/user-products/user-products.component';

export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'upload-product',
        component: ProductUploadComponent
      },
      {
        path: 'category/:id',
        component: CategoryComponent
      },
      {
        path: 'product/:id',
        component: ProductComponent
      },
      {
        path: 'products',
        component: UserProductsComponent
      },
      {
        path: 'conversation',
        component: ConversationComponent
      }
    ]
  }

];
