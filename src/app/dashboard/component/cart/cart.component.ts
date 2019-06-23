import {Component, OnInit} from '@angular/core';
import {IProduct} from '@ec-shared/models/product';
import {ProductController} from '@ec-core/controllers/product-controller';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartProducts: IProduct[];

  constructor(private productController: ProductController, private router: Router) {

  }

  ngOnInit() {
    this.productController.getAllCartProducts().subscribe((cartProducts: IProduct[]) => {
      this.cartProducts = cartProducts;
    });
  }

  removeCartProduct(id: string) {
    console.log('removing item');

    this.productController.removeCartProduct(id);
  }
}




