import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonUtils } from '../../../shared/utils/common.utils';
import { AuthController } from '../../../core/controllers/auth-controller';
import { Constants } from '../../../shared/utils/constants';
import {IUser} from '../../../shared/models/users';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  formGroup: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  phoneNo: FormControl;
  country: FormControl;
  countries: string[];
  user: IUser;
  constructor(private authController: AuthController) {
    this.countries = CommonUtils.getCountries();
    this.authController.getUser().subscribe(res => {
this.user = res;
      });
  }

  ngOnInit() {
    this.firstName = new FormControl({ value: this.user.firstName, disabled: true });
    this.lastName = new FormControl({ value: this.user.lastName, disabled: true });
    this.email = new FormControl({ value: this.user.email, disabled: true });
    this.phoneNo = new FormControl({ value: this.user.phoneNo, disabled: true });
    this.country = new FormControl({ value: this.user.country, disabled: true });
    this.formGroup = new FormGroup({
      'firstName': this.firstName,
      'lastName': this.lastName,
      'email': this.email,
      'phoneNo': this.phoneNo,
      'country': this.country,
    });
  }
onEdit(){
    this.formGroup.enable();
}
}
