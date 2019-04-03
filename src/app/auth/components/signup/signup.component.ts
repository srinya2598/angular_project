import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonUtils } from '../../../shared/utils/common.utils';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

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

  constructor(private router: Router, private apiService: ApiService) {
    this.countries = CommonUtils.getCountries();

  }

  ngOnInit() {
    this.firstName = new FormControl(null, [Validators.required]);
    this.lastName = new FormControl(null, [Validators.required]);
    this.email = new FormControl(null, [Validators.required]);
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
    console.log(this.formGroup.value);
    this.isLoading = true;
    const email = this.formGroup.controls['email'].value;
    const password = this.formGroup.controls['password'].value;
    this.apiService.signup(email, password).subscribe(res => {
      console.log(res);
      this.isLoading = false;
      this.router.navigate(['login']);
    });
  }

  private validatePassword(control: AbstractControl): { [key: string]: boolean } {
    if (this.password.value != control.value) {
      return { 'Password do not match': true };
    } else return null;
  }

}
