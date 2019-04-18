import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  private id: string;

  constructor(private route: ActivatedRoute ) { }

  ngOnInit() {
this.route.params.subscribe((res) => {
  this.id = res[this.id];
});
  }

}
