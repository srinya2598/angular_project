import { Injectable } from '@angular/core';
import { IProduct } from '../../shared/models/product';
import { Store } from '@ngrx/store';
import { State } from '../../dashboard/reducers';
import {AddProduct, FetchSuccess} from '../../dashboard/actions/dashboard';
import { ApiService } from '../services/api.service';
import { NotificationService } from '../services/notification.service';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductController {

  uploadPercent: BehaviorSubject<number>;
  downloadUrlSubject: BehaviorSubject<string>;

  constructor(private  store: Store<State>,
              private apiService: ApiService,
              private notificationService: NotificationService,
              private productController: ProductController
  ) {
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
    const ref = this.apiService.getProductImageRef(fileName);
    const task = this.apiService.uploadImages(fileName, file, ref);
    task.percentageChanges().subscribe(percent => this.uploadPercent.next(percent));
    task.snapshotChanges().pipe(
      finalize(() => ref.getDownloadURL().subscribe(url => this.downloadUrlSubject.next(url)))
    ).subscribe(null, (error) => {
      this.notificationService.error(error.message);
    });
    return [this.uploadPercent, this.downloadUrlSubject];
  }

  fetchProduct() {
    console.log('products fetched ')

    this.apiService.fetchProduct().subscribe((res ) => {this.store.dispatch(new FetchSuccess(res))},
      (error)=> {
      this.notificationService.error(error);
      });

  }
}




