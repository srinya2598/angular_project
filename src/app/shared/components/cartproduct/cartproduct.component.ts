import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IProduct} from '@ec-shared/models/product';

@Component({
  selector: 'ec-cartproduct',
  templateUrl: './cartproduct.component.html',
  styleUrls: ['./cartproduct.component.scss']
})
export class CartproductComponent implements OnInit {
  @Input() product: IProduct;
  @Output() removeProduct: EventEmitter<string>;

  constructor() {
    this.removeProduct = new EventEmitter();
  }

  ngOnInit() {
  }

  onRemove() {
    console.log('remove from cart', this.product);
    this.removeProduct.emit(this.product.id);
  }

}
