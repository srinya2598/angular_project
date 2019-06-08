import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ISingleProduct} from '../../models/single-product';

@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.scss']
})
export class SingleproductComponent implements OnInit {
  @Input() product: ISingleProduct;
  @Output('productId')
  productId = new EventEmitter();
  private cartProduct: string;

  constructor() {
  }

  ngOnInit() {
  }

  onAdd() {
    this.cartProduct = this.product.id;
    this.productId.emit(this.cartProduct);
  }
}
