import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ISingleProduct} from '../../models/single-product';
import {Router} from '@angular/router';
import {ConversationalController} from '@ec-core/controllers/conversational.controller';
import {ApiService} from '@ec-core/services/api.service';
import {Constants} from '@ec-shared/utils/constants';
import {CommonUtils} from '@ec-shared/utils/common.utils';

@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.scss']
})
export class SingleproductComponent implements OnInit {
  @Input() product: ISingleProduct;
  @Output() addToCart = new EventEmitter<string>();

  constructor(private router: Router,
              private conversationalController: ConversationalController,
              private apiService: ApiService) {
  }

  ngOnInit() {
  }

  onAdd() {
    this.addToCart.emit(this.product.id);


  }

  onChat() {
    this.conversationalController.setSelectedUserId(this.product.userId);
    let roomId = this.conversationalController.isRoomsExisting(this.product.userId);
    if (roomId) {
      this.conversationalController.setSelectedRoomId(<string>roomId);
      this.conversationalController.fetchRoomMessages(<string>roomId);
    } else {
      this.conversationalController.createRoom().then(createdRoomId => {
        this.conversationalController.setSelectedRoomId(createdRoomId);
      });
    }

    this.router.navigate(['dashboard/chat', CommonUtils.getRoutePath(this.product.userId)]);
  }

  isLoggedInUserProduct() {
    const userId = this.apiService.getItem(Constants.USER_UID);
    return userId === this.product.userId;
  }
}

