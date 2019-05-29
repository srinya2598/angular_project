import { Component, OnInit } from '@angular/core';
import { ProductController } from '@ec-core/controllers/product-controller';
import { IProduct } from '@ec-shared/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.scss']
})
export class UserProductsComponent implements OnInit {

  products: IProduct[];

  constructor(private productControllers: ProductController, private router: Router) {
  }

  ngOnInit() {
    this.productControllers.getUserProducts().subscribe((products: IProduct[]) => {
      this.products = products;
    });
  }

  visitProduct(product: IProduct) {
    let id = product.id;
    this.router.navigate(['dashboard/product', id]);
  }

}
