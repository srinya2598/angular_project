import { Injectable } from '@angular/core';
import { IProduct } from '../../shared/models/product';
import { Store } from '@ngrx/store';
import {
  getBooks,
  getElectronicAppliances,
  getHomeAppliances,
  getIsProductLoaded, getKidCloathings, getMenCloathings,
  getMobileAndComputers, getMovies, getOtherItems,
  getSelectedCategory, getSelectedProduct, getToys, getVehicles, getWomenCloathings,
  State
} from '../../dashboard/reducers';
import { AddProduct, FetchSuccess, SelectCategory } from '../../dashboard/actions/product';
import { ApiService } from '../services/api.service';
import { NotificationService } from '../services/notification.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { IProductCategory } from '../../shared/models/category';

@Injectable({
  providedIn: 'root'
})
export class ProductController {

  uploadPercent: BehaviorSubject<number>;
  downloadUrlSubject: BehaviorSubject<string>;

  constructor(private  store: Store<State>,
              private apiService: ApiService,
              private notificationService: NotificationService) {

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

  setSelectedCategory(category: IProductCategory) {
    this.store.dispatch(new SelectCategory(category));
  }

  getSelectedCategoryProducts():Observable<IProduct[]> {
    let category:IProductCategory;
    this.store.select(getSelectedCategory).subscribe(res => category = res);
    switch (category) {
      case IProductCategory.MOBILE_COMPUTER:
        return this.store.select(getMobileAndComputers);

      case IProductCategory.ELECTRONIC_APPLIANCES:
        return this.store.select(getElectronicAppliances);

      case IProductCategory.HOME_APPLIANCES:
        return this.store.select(getHomeAppliances);

      case IProductCategory.MEN_CLOTHING:
        return this.store.select(getMenCloathings);

      case IProductCategory.WOMEN_CLOTHING:
        return this.store.select(getWomenCloathings);

      case IProductCategory.KIDS_CLOTHING:
        return this.store.select(getKidCloathings);

      case IProductCategory.TOYS:
        return this.store.select(getToys);

      case IProductCategory.VEHICLES:
        return this.store.select(getVehicles);

      case IProductCategory.BOOKS:
        return this.store.select(getBooks);

      case IProductCategory.MOVIES_MUSIC_VIDEOS:
        return this.store.select(getMovies);

      default:
        return this.store.select(getOtherItems);

    }
  }

  fetchProduct() {
    this.store.select(getIsProductLoaded).pipe(take(1)).subscribe(isLoaded => {
      if (!isLoaded) {
        this.apiService.fetchProduct().pipe(take(1)).subscribe((res) => {
            let products: IProduct[] = [];
            if (res) {
              Object.keys(res).forEach(key => products.push(res[key]));
              this.store.dispatch(new FetchSuccess(products));
            }
          },
          (error) => {
            this.notificationService.error(error);
          });
      }
    });
  }

  getSingleProduct(id) {
    return this.store.select((state) => getSelectedProduct(state, id));
  }
}




