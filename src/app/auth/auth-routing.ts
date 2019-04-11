import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { Routes } from '@angular/router';
import {ProductUploadComponent} from '../dashboard/component/product-upload/product-upload.component';

export const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  }
];

