import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../models/product';

@Component({
  selector: 'ec-product',
  styleUrls: ['./product.component.scss'],
  template:`
  <mat-card>
    <mat-card-content>
      <div fxLayout="row" fxLayoutGap="5px">
        <div>
          <img [src]="product.imageUrl" />
        </div>
        <div fxLayout="column" fxLayoutGap="3px">
          <h3>{{product.name}}</h3>
          <p>{{product.description}}</p>
          <p>{{product.price}}</p>
        </div>
      </div>
    </mat-card-content>
  </mat-card>
  `
})
export class ProductComponent implements OnInit {

  @Input() product:IProduct;

  constructor() { }

  ngOnInit() {
  }

}
