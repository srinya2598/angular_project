import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductController} from '../../../core/controllers/product-controller';
import {ISingleProduct} from '../../../shared/models/single-product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  private id: string;
  singleProduct: ISingleProduct;

  constructor(private route: ActivatedRoute, private productController: ProductController) { }

  ngOnInit() {
this.route.params.subscribe((res) => {
  this.id = res['id'];
  console.log(this.id);
  this.productController.getSingleProduct(this.id).subscribe(res => this.singleProduct = res);
  // this.productController.getSingleProduct(this.id).subscribe(res1 =>
  // console.log(res1));
});
  }


}
