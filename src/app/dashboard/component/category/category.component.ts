import { Component, OnInit } from '@angular/core';
import { ProductController } from '../../../core/controllers/product-controller';
import { IProduct } from '../../../shared/models/product';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  products: IProduct[];

  constructor(private productController: ProductController) {
  }

  ngOnInit() {
    this.productController.getSelectedCategoryProducts().subscribe(res => {
      console.log(res);
      if (res) {
        this.products = res;
      }
    });
  }

}
