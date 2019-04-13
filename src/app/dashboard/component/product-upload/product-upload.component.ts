import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CommonUtils} from '../../../shared/utils/common.utils';
import {ProductController} from '../../../core/controllers/product-controller';
import {IProduct} from '../../../shared/models/product';
import {IProductCategory} from '../../../shared/models/category';
import {AuthController} from '../../../core/controllers/auth-controller';
import {IUser} from '../../../shared/models/users';

@Component({
  selector: 'app-product-upload',
  templateUrl: './product-upload.component.html',
  styleUrls: ['./product-upload.component.scss']
})
export class ProductUploadComponent implements OnInit {

  formGroup: FormGroup;
  categories: string[];
  userId;


  constructor( private productController:ProductController, private authController:AuthController ) {
    this.categories = CommonUtils.getCategories();
    this.authController.getUser().subscribe((res:IUser) => {
      if(!res)
      this.userId = res.id
    });
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      'productName': new FormControl(null),
      'productDescription': new FormControl(null),
      'category': new FormControl(null),
      'image': new FormControl(null),
    });



}
  uploadProduct() {
    console.log("called");
    // this.authController.signUp(this.formGroup.value);
    const p:IProduct = {
      name:this.formGroup.controls["productName"].value,
      category:this.formGroup.controls["category"].value,
      description:this.formGroup.controls["productDescription"].value,
      id:CommonUtils.getRandomId(),
      userId:this.userId,
      imageUrl:"skdfnkdf"
    };

    this.productController.uploadProduct(p)
  }


}
