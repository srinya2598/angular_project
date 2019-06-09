import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISingleProduct } from '../../models/single-product';

@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.scss']
})
export class SingleproductComponent implements OnInit {
  @Input() product: ISingleProduct;
  @Output() addToCart = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  onAdd() {
    console.log("add to cart", this.product);
    this.addToCart.emit(this.product.id);
  }
}
