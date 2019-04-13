import {Injectable} from '@angular/core';
import {IProduct} from '../../shared/models/product';
import {Store} from '@ngrx/store';
import {getBooksids, getEntities, State} from '../../dashboard/reducers';
import {AddProduct} from '../../dashboard/actions/dashboard';
import {ApiService} from '../services/api.service';
import { NotificationService} from '../services/notification.service';

@Injectable({
  providedIn:'root'
})
export class ProductController {

  constructor(private  store:Store<State>, private apiService: ApiService, private notificationService: NotificationService) {
this.store.select(getEntities).subscribe(res => console.log("Entities",res));
this.store.select(getBooksids).subscribe(res => console.log("ids",res));


  }

  uploadProduct(product:IProduct) {
  this.apiService.setProductDetails(product.id, product).subscribe(res =>{
    this.notificationService.success('Your Product is Updated Successfully');
    this.store.dispatch(new AddProduct(product))
  },(error)=>{
    this.notificationService.error('Something went wrong, Please try Again');
    }

    )
    this.store.dispatch(new AddProduct(product));
  }

}









