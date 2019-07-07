import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISingleProduct } from '../../models/single-product';
import { Router } from '@angular/router';
import { ApiService } from '@ec-core/services/api.service';
import { Constants } from '@ec-shared/utils/constants';

@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.scss']
})
export class SingleproductComponent implements OnInit {
  @Input() product: ISingleProduct;
  @Output() addToCart = new EventEmitter<string>();

  constructor(private router: Router,
              private apiService: ApiService) {
  }

  ngOnInit() {
  }

  onAdd() {
    this.addToCart.emit(this.product.id);


  }

  onChat() {
    this.router.navigate(['dashboard/chat'], { queryParams: { id: this.product.userId } });
  }

  isLoggedInUserProduct() {
    const userId = this.apiService.getItem(Constants.USER_UID);
    return userId === this.product.userId;
  }
}

