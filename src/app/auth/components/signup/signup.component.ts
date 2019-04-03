import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommonUtils} from '../../../shared/utils/common.utils';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  formGroup: FormGroup;
  countries: string[];
  isLoading = false;

  constructor(private router: Router) {
    this.countries = CommonUtils.getCountries();

  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      'firstName': new FormControl(null, [Validators.required]),
      'lastName': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phoneNo': new FormControl(null, [Validators.required, Validators.pattern('[0-9]{10,10}')]),
      'country': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
      'confirmPassword': new FormControl(null, [Validators.required]),
    },);
  }

  signup() {
    console.log(this.formGroup.value);
    this.isLoading = true;
    // Added only for testing purpose...
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['login']);
    }, 3000);
  }


}
