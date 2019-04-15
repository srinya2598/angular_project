import { Injectable } from '@angular/core';
import { IProduct } from '../../shared/models/product';
import { Store } from '@ngrx/store';
import { State } from '../../dashboard/reducers';
import { AddProduct } from '../../dashboard/actions/dashboard';
import { ApiService } from '../services/api.service';
import { NotificationService } from '../services/notification.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductController {

  uploadPercent: BehaviorSubject<number>;
  downloadUrlSubject: BehaviorSubject<string>;
  downloadUrl: Observable<string>;

  constructor(private  store: Store<State>, private apiService: ApiService, private notificationService: NotificationService) {
    this.uploadPercent = new BehaviorSubject<number>(0);
    this.downloadUrlSubject = new BehaviorSubject('null');
  }

  uploadProduct(product: IProduct) {
    this.apiService.setProductDetails(product.id, product).subscribe(res => {
        this.notificationService.success('Your Product is Updated Successfully');
        this.store.dispatch(new AddProduct(product));
      }, (error) => {
        this.notificationService.error('Something went wrong, Please try Again');
      }
    );
    this.store.dispatch(new AddProduct(product));
  }

  uploadProductImage(file: File): BehaviorSubject<any>[] {
    const fileName = file.name;
    const task = this.apiService.uploadImages(fileName, file);
    task.percentageChanges().subscribe(percent => this.uploadPercent.next(percent));
    this.apiService.getProductImageRef(fileName).getDownloadURL().subscribe(url => {
      if(url) {
        this.downloadUrlSubject.next(url);
      }
    });
    return [this.uploadPercent, this.downloadUrlSubject];
  }
}




