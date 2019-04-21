import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../../shared/models/users';
import { MAT_DIALOG_DATA } from '@angular/material';
import { CommonUtils } from '../../../shared/utils/common.utils';
import { AuthController } from '../../../core/controllers/auth-controller';
import { ProfileController } from '../../../core/controllers/profile-contoller';
import { NotificationService } from '../../../core/services/notification.service';

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
  downloadUrl: string;
  uploadPercent = 0;

  buttonText = ButtonText.EDIT;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private authController: AuthController,
              private profileController: ProfileController,
              private notificationService: NotificationService) {
    this.user = data.user;
    this.authController.getIsLoading().subscribe(res => this.isLoading = res);
  }

  ngOnInit() {
    this.countries = CommonUtils.getCountries();
    if (this.user.profileUrl) {
      this.downloadUrl = this.user.profileUrl;
      this.uploadPercent = 100;
    }
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
      if ((!this.formGroup.pristine && this.formGroup.valid) || (this.downloadUrl != this.user.profileUrl)) {
        console.log(this.user);
        const user: IUser = {
          id: this.user.id,
          email: this.user.email,
          firstName: this.formGroup.controls['firstName'].value,
          lastName: this.formGroup.controls['lastName'].value,
          phoneNo: this.formGroup.controls['phoneNo'].value,
          country: this.formGroup.controls['country'].value,
          profileUrl: this.downloadUrl ? this.downloadUrl : ''
        };
        this.authController.updateUser(this.user.id, user);
        this.formGroup.disable();
        this.buttonText = ButtonText.EDIT;
      }
    }
  }

  uploadProfile(event) {
    if (!event) {
      this.notificationService.error('Please select an image');
      return;
    }
    if(!CommonUtils.isImage(event.target.files[0].type)){
      this.notificationService.error("File type not supported");
      return;
    }

    const response = this.profileController.uploadProfileImage(event.target.files[0]);
    response[0].subscribe(percent => {
      console.log(percent);
      this.uploadPercent = percent;
    });
    response[1].subscribe(res => this.downloadUrl = res);

  }
}

export enum ButtonText {
  EDIT = 'Edit',
  SUBMIT = 'Submit'
}

