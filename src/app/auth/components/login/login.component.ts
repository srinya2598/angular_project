import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthController } from '@ec-core/controllers/auth-controller';
import { Constants } from '@ec-shared/utils/constants';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  isLoading = false;
  isPassword: boolean = true;
  isAlive = true;

  constructor(private authController: AuthController) {
    this.authController.getIsLoading().pipe(takeWhile(() => this.isAlive)).subscribe(isLoading => this.isLoading = isLoading);
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'password': new FormControl(null, [Validators.required])
    });

  }

  login() {
    this.authController.login(this.formGroup.value);
  }

  loginWithGoogle() {
    this.authController.googleLogin(Constants.LOGIN_WITH_GOOGLE);
  }

  get inputType(): string {
    return this.isPassword ? 'password' : 'text';
  }

  toggleDisplayPassword() {
    this.isPassword = !this.isPassword;
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }
}
