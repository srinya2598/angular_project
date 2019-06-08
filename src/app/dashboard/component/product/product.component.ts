import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ProductController} from '@ec-core/controllers/product-controller';
import {ISingleProduct} from '@ec-shared/models/single-product';
import {SingleproductComponent} from '@ec-shared/components/singleproduct/singleproduct.component';
import {takeWhile} from 'rxjs/operators';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  private id: string;
  singleProduct: ISingleProduct;
  isAlive = true;

  constructor(private route: ActivatedRoute, private productController: ProductController) {
  }

  ngOnInit() {
    this.route.params.subscribe((res) => {
      this.id = res['id'];
      console.log(this.id);
      this.productController.getSingleProduct(this.id).subscribe((res: ISingleProduct) => this.singleProduct = res);
      // this.productController.getSingleProduct(this.id).subscribe(res1 =>
      // console.log(res1));
      this.productController.getSingleProduct(this.id).pipe(takeWhile(() => this.isAlive)).subscribe(res => this.singleProduct = res);
    });

  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }

  onAdd(productId) {
    this.productController.addToCart(productId);
  }
}
