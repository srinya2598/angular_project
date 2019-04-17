import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonUtils } from '../../../shared/utils/common.utils';
import { ProductController } from '../../../core/controllers/product-controller';
import { IProduct } from '../../../shared/models/product';
import { IProductCategory } from '../../../shared/models/category';
import { AuthController } from '../../../core/controllers/auth-controller';
import { IUser } from '../../../shared/models/users';
import { AngularFireStorage } from '@angular/fire/storage';
import { ApiService } from '../../../core/services/api.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Constants } from '../../../shared/utils/constants';


@Component({
  selector: 'app-product-upload',
  templateUrl: './product-upload.component.html',
  styleUrls: ['./product-upload.component.scss']
})
export class ProductUploadComponent implements OnInit {

  formGroup: FormGroup;
  categories: string[];
  userId;
  uploadPercent = 0;
  downloadUrl = null;


  constructor(private productController: ProductController,
              private authController: AuthController,
              private apiService: ApiService,
              private storage: AngularFireStorage,
              private notificationService: NotificationService) {
    this.categories = CommonUtils.getCategories();
    this.authController.getUser().subscribe((res) => {
      if (res) this.userId = res.id;
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
    if (!this.downloadUrl) {
      this.notificationService.error('Please select an image');
      return;
    }
    const product: IProduct = {
      name: this.formGroup.controls['productName'].value,
      category: this.formGroup.controls['category'].value,
      description: this.formGroup.controls['productDescription'].value,
      id: CommonUtils.getRandomId(),
      userId: this.userId,
      imageUrl: this.downloadUrl
    };

    this.productController.uploadProduct(product);
  }

  uploadImage(event) {
    if (!event) {
      this.notificationService.error('Please select an image');
      return;
    }
    const response = this.productController.uploadProductImage(event.target.files[0]);
    response[0].subscribe(percent => this.uploadPercent = percent);
    response[1].subscribe(res => this.downloadUrl = res);
  }
}
