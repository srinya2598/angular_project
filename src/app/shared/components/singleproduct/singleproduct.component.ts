import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISingleProduct } from '../../models/single-product';
import { Store } from '@ngrx/store';
import {SelectedUserId} from '../../../chat/actions/message';
import {State} from '../../../chat/reducers';
import {Router} from '@angular/router';

@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.scss']
})
export class SingleproductComponent implements OnInit {
  @Input() product: ISingleProduct;
  @Output() addToCart = new EventEmitter<string>();

  constructor(private store: Store<State>,
              private router: Router) {
  }

  ngOnInit() {
  }

  onAdd() {
    console.log('add to cart', this.product);
    this.addToCart.emit(this.product.id);
  }

  onChat(){
    console.log('chat');
    this.store.dispatch(new SelectedUserId(this.product.userId));
    this.router.navigate(['/dashboard/chat']);
  }
}

