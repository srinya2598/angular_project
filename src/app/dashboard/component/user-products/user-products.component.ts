import { Component, OnInit } from '@angular/core';
import { ProductController } from '../../../core/controllers/product-controller';
import { IProduct } from '../../../shared/models/product';

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.scss']
})
export class UserProductsComponent implements OnInit {

  products: IProduct[];

  constructor(private productControllers: ProductController) {
  }

  ngOnInit() {
    this.productControllers.getUserProducts().subscribe((products: IProduct[]) => {
      this.products = products;
    });
  }

}
