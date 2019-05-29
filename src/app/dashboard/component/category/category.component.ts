import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductController } from '@ec-core/controllers/product-controller';
import { IProduct } from '@ec-shared/models/product';
import { Router } from '@angular/router';
import { switchMap, takeWhile } from 'rxjs/operators';
import { IProductCategory } from '@ec-shared/models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  products: IProduct[];
  isAlive = true;

  constructor(private productController: ProductController, private router: Router) {
  }

  ngOnInit() {
    this.productController.getSelectedCategory().pipe(
      switchMap((category: IProductCategory) => this.productController.getSelectedCategoryProducts(category)),
      takeWhile(() => this.isAlive)
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

  ngOnDestroy(): void {
    this.isAlive = false;
  }
}
