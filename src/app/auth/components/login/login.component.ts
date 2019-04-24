import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthController } from '../../../core/controllers/auth-controller';
import { Constants } from '../../../shared/utils/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  isLoading = false;
  isPassword: boolean = true;

  constructor(private authController: AuthController) {
    this.authController.getIsLoading().subscribe(isLoading => this.isLoading = isLoading);
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
  get inputType(): string{
    return this.isPassword?"password":"text";
  }
  toggleDisplayPassword(){
    this.isPassword = !this.isPassword;
  }
}
