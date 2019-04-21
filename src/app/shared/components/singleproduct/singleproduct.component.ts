import { Component, Input, OnInit } from '@angular/core';
import { ISingleProduct } from '../../models/single-product';

@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.scss']
})
export class SingleproductComponent implements OnInit {
  @Input() product: ISingleProduct;

  constructor() {
  }

  ngOnInit() {
  }

}
