import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { authRoutes } from './auth-routing';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(authRoutes)
  ]
})
export class AuthModule {
}
