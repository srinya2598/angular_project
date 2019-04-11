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
  productName: FormControl;
  category: FormControl;
  categories: string[];
  productDescription: FormControl;
  uploadImage: File;


  constructor( private authController: AuthController ) {
    this.categories = CommonUtils.getCategories();
  }

  ngOnInit() {
    this.productName = new FormControl(null, [Validators.required]);
    this.productDescription = new FormControl(null, [Validators.required]);
    this.formGroup = new FormGroup({
      'productName': new FormControl(null),
      'productDescription': new FormControl(null),
      'category': new FormControl(null),
      'uploadImage': new FormControl(null),
    });

}
  upload() {
    this.authController.signUp(this.formGroup.value);
  }


}
