import { Component, OnInit } from '@angular/core';
import { ProductController } from '../../../core/controllers/product-controller';
import { IProduct } from '../../../shared/models/product';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { IProductCategory } from '../../../shared/models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  products: IProduct[];

  constructor(private productController: ProductController, private router: Router) {
  }

  ngOnInit() {
    this.productController.getSelectedCategory().pipe(
      switchMap((category:IProductCategory) => this.productController.getSelectedCategoryProducts(category))
    ).subscribe(res => {
      console.log(res);
      if (res) {
        this.products = res;
      }
    });
  }

  visitProduct(product: IProduct) {
    let id = product.id;
    this.router.navigate(['dashboard/product', id]);
  }

}
