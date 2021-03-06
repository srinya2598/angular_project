import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductController } from '@ec-core/controllers/product-controller';
import { IProductCategory } from '@ec-shared/models/category';
import { CommonUtils} from '@ec-shared/utils/common.utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private productController: ProductController, private router: Router , ) {
  }

  ngOnInit() {
    this.productController.fetchProduct();
    this.productController.fetchCartProduct();
    console.log('01');

  }

}
