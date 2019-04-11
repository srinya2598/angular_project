import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import {CommonUtils} from '../../../shared/utils/common.utils';
import {AuthController} from '../../../core/controllers/auth-controller';

@Component({
  selector: 'app-product-upload',
  templateUrl: './product-upload.component.html',
  styleUrls: ['./product-upload.component.scss']
})
export class ProductUploadComponent implements OnInit {

  formGroup: FormGroup;
  categories: string[];


  constructor( private authController: AuthController ) {
    this.categories = CommonUtils.getCategories();
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      'productName': new FormControl(null),
      'productDescription': new FormControl(null),
      'category': new FormControl(null),
      'image': new FormControl(null),
    });

}
  upload() {
    this.authController.signUp(this.formGroup.value);
  }


}
