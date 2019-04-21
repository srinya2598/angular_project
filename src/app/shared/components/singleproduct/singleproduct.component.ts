import {Component, Input, OnInit} from '@angular/core';
import {ISingleproduct} from '../../models/singleproduct';

@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.scss']
})
export class SingleproductComponent implements OnInit {
@Input() product:ISingleproduct;
  constructor() { }

  ngOnInit() {
  }

}
