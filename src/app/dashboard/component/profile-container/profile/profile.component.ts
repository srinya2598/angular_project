import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../../../shared/models/users';
import { MAT_DIALOG_DATA } from '@angular/material';
import { CommonUtils } from '../../../../shared/utils/common.utils';
import { AuthController } from '../../../../core/controllers/auth-controller';
import {ProfileContoller} from '../../../../core/controllers/profile-contoller';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  formGroup: FormGroup;
  countries: string[];
  user: IUser;
  ButtonText = ButtonText;
  isLoading = false;

  buttonText = ButtonText.EDIT;

  constructor(@Inject(MAT_DIALOG_DATA) public data, private authController: AuthController, private profileConntroller: ProfileContoller) {
    this.user = data.user;
    this.authController.getIsLoading().subscribe(res => this.isLoading = res);
  }

  ngOnInit() {
    this.countries = CommonUtils.getCountries();
    this.formGroup = new FormGroup({
      'firstName': new FormControl({ value: this.user.firstName, disabled: true }, [Validators.required]),
      'lastName': new FormControl({ value: this.user.lastName, disabled: true }, [Validators.required]),
      'email': new FormControl({ value: this.user.email, disabled: true }, [Validators.required]),
      'phoneNo': new FormControl({ value: this.user.phoneNo, disabled: true }, [Validators.required]),
      'country': new FormControl({ value: this.user.country, disabled: true }, [Validators.required]),
    });
  }

  onSumbit() {
    if (this.buttonText === ButtonText.EDIT) {
      this.buttonText = ButtonText.SUBMIT;
      this.formGroup.enable();
      this.formGroup.controls['email'].disable();
    } else {
      if (!this.formGroup.pristine && this.formGroup.valid) {
        console.log(this.user);
        const user: IUser = {
          id: this.user.id,
          email: "naimishverma50@gmail.com",
          firstName: this.formGroup.controls['firstName'].value,
          lastName: this.formGroup.controls['lastName'].value,
          phoneNo: this.formGroup.controls['phoneNo'].value,
          country: this.formGroup.controls['country'].value
        };
        this.authController.updateUser(this.user.id, user);
      }
    }
  }

  profileImage(event){
    if (!event) {
      this.notificationService.error('Please select an image');
      return;
    }
    const response = this.profileController.uploadProductImage(event.target.files[0]);
    response[0].subscribe(percent => this.uploadPercent = percent);
    response[1].subscribe(res => this.downloadUrl = res);
  }
  }
}

export enum ButtonText {
  EDIT = 'Edit',
  SUBMIT = 'Submit'
}

