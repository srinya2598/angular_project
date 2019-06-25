import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISingleProduct } from '../../models/single-product';
import { Store } from '@ngrx/store';
import {SelectedUserId} from '../../../chat/actions/message';
import {getSelectedUserId, State} from '../../../chat/reducers';
import {Router} from '@angular/router';
import {ConversationalController} from '@ec-core/controllers/conversational.controller';

@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.scss']
})
export class SingleproductComponent implements OnInit {
  @Input() product: ISingleProduct;
  @Output() addToCart = new EventEmitter<string>();

  constructor(private store: Store<State>,
              private router: Router,
              private conversationalController: ConversationalController) {
  }

  ngOnInit() {
  }

  onAdd() {
    console.log('add to cart', this.product);
    this.addToCart.emit(this.product.id);
  }

  onChat(){
    console.log('chat');
    this.conversationalController.setSelectedUserId(this.product.userId);
    this.conversationalController.getSelectedUserId().subscribe(res => {
      console.log(res);
    });
    this.router.navigate(['dashboard/chat']);
  }
}

