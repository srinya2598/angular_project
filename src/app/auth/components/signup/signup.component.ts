import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonUtils } from '../../../shared/utils/common.utils';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  formGroup: FormGroup;
  countries: string[];

  constructor() {
    this.countries = CommonUtils.getCountries();
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      'firstName': new FormControl(null, [Validators.required]),
      'lastName': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phoneNo': new FormControl(null, [Validators.required]),
      'country': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
      'confirmPassword': new FormControl(null, [Validators.required]),
    });
  }

  signup() {
    console.log(this.formGroup.value);
  }
}
