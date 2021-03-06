import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonUtils } from '@ec-shared/utils/common.utils';
import { AuthController } from '@ec-core/controllers/auth-controller';
import { Constants } from '@ec-shared/utils/constants';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  phoneNo: FormControl;
  country: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  countries: string[];
  isLoading = false;
  isAlive = true;

  constructor(private authController: AuthController) {
    this.countries = CommonUtils.getCountries();
    this.authController.getIsLoading().subscribe(isLoading => this.isLoading = isLoading);
    this.authController.getIsLoading().pipe(takeWhile(() => this.isAlive)).subscribe(isLoading => this.isLoading = isLoading);
  }

  ngOnInit() {
    this.firstName = new FormControl(null, [Validators.required]);
    this.lastName = new FormControl(null, [Validators.required]);
    this.email = new FormControl(null, [Validators.required, Validators.email]);
    this.phoneNo = new FormControl(null, [Validators.required, Validators.pattern('[0-9]{10,10}')]);
    this.country = new FormControl(null, [Validators.required]);
    this.password = new FormControl(null, [Validators.required]);
    this.confirmPassword = new FormControl(null, [Validators.required, this.validatePassword.bind(this)]);
    this.formGroup = new FormGroup({
      'firstName': this.firstName,
      'lastName': this.lastName,
      'email': this.email,
      'phoneNo': this.phoneNo,
      'country': this.country,
      'password': this.password,
      'confirmPassword': this.confirmPassword,
    });
  }


  signup() {
    this.authController.signUp(this.formGroup.value);
  }

  signupWithGoogle() {
    this.authController.googleLogin(Constants.SIGNUP_WITH_GOOGLE);
  }

  private validatePassword(control: AbstractControl): { [key: string]: boolean } {
    if (this.password.value != control.value) {
      return { 'Password do not match': true };
    } else return null;
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }
}
