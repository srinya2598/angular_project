import { Injectable } from '@angular/core';
import { IProduct } from '@ec-shared/models/product';
import { Store } from '@ngrx/store';
import {
  getBooks,
  getCartProductIds,
  getCartProducts,
  getElectronicAppliances,
  getHomeAppliances,
  getIsProductLoaded,
  getKidCloathings,
  getLoggedInUserProducts,
  getMenCloathings,
  getMobileAndComputers,
  getMovies,
  getOtherItems,
  getSelectedCategory,
  getSelectedProduct,
  getToys,
  getVehicles,
  getWomenCloathings,
  State
} from '../../dashboard/reducers';
import {
  AddCart,
  AddProduct,
  FetchCartProductSuccess,
  FetchSuccess,
  RemoveCart,
  SelectCategory,
  SetSelectedProductUserDetails
} from '../../dashboard/actions/product';
import { ApiService } from '../services/api.service';
import { NotificationService } from '../services/notification.service';
import { BehaviorSubject, fromEvent, interval, Observable, of, Subscription, timer } from 'rxjs';
import { finalize, map, switchMap, take } from 'rxjs/operators';
import { IProductCategory } from '@ec-shared/models/category';
import { BroadcasterConstants, Constants } from '@ec-shared/utils/constants';
import { BroadcasterService } from '@ec-core/services/broadcaster.service';
import { IUser } from '@ec-shared/models/users';

@Injectable({
  providedIn: 'root'
})
export class ProductController {
  uploadPercent: BehaviorSubject<number>;
  downloadUrlSubject: BehaviorSubject<string>;
  private pollingTimeInterval = 5000;
  pollingSubscriber: Subscription;

  constructor(private  store: Store<State>,
              private apiService: ApiService,
              private notificationService: NotificationService,
              private broadcasterService: BroadcasterService) {

    this.uploadPercent = new BehaviorSubject<number>(0);
    this.downloadUrlSubject = new BehaviorSubject('null');
    this.checkConnectivity();

  }

  checkConnectivity() {
    let online$ = fromEvent(window, 'online');
    let offline$ = fromEvent(window, 'offline');
    online$.subscribe(() => this.broadcasterService.emit(BroadcasterConstants.NETWORK_CONNECTED));
    offline$.subscribe(() => this.broadcasterService.emit(BroadcasterConstants.NETWORK_DISCONNECTED));
    this.broadcasterService.listen(BroadcasterConstants.NETWORK_CONNECTED).subscribe(() => {
      if (!this.pollingSubscriber) {
        this.pollingProducts();
      }
    });
    this.broadcasterService.listen(BroadcasterConstants.NETWORK_DISCONNECTED).subscribe(() => {
      if (this.pollingSubscriber) {
        this.pollingSubscriber.unsubscribe();

      }}
    );


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

  getSelectedCategory(): Observable<IProductCategory> {
    return this.store.select(getSelectedCategory);
  }

  getSelectedCategoryProducts(category: IProductCategory): Observable<IProduct[]> {
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
  };

  fetchProduct() {
    const userId = this.apiService.getItem(Constants.USER_UID);
    this.store.select(getIsProductLoaded).pipe(take(1)).subscribe(isLoaded => {
      if (!isLoaded) {
        this.getProducts(userId);
      }
    });
  }

  getSingleProduct(id) {
    let data;
    let userId;
    let productId;
    return this.store.select((state) => getSelectedProduct(state, id)).pipe(
      switchMap((res) => {
        productId = res.id;
        data = {...res};
        return this.apiService.getUserDetails(res.userId);
      }),
      map((res: IUser) => {
        this.store.dispatch(new SetSelectedProductUserDetails(res));
        // @ts-ignore
        userId = res.id;
        data = {...data, ...res, id: productId, userId: userId};
        return data;
      })
    );
  }

  getUserProducts(): Observable<IProduct[]> {
    return this.store.select(getLoggedInUserProducts);
  }

  addToCart(productId: string) {
    let isProductExisting = false;
    const userId = this.apiService.getItem(Constants.USER_UID);
    if (!productId || !userId) {
      return;
    }
    this.store.select(getCartProductIds).pipe(
      take(1),
      switchMap((ids: string[]) => {
        console.log('Map', ids);
        if (ids.includes(productId)) {
          this.notificationService.error('Product already exists in the cart');
          isProductExisting = true;
          return of(null);
        } else {
          const cartProducts = [...ids, productId];
          return this.apiService.setCartProducts(userId, cartProducts);
        }
      })
    ).subscribe((res) => {
      if (isProductExisting === false) {
        this.notificationService.success('Product successfully added to the cart');
        this.store.dispatch(new AddCart(productId));

      }
    });
  }

  getAllCartProducts(): Observable<IProduct[]> {
    return this.store.select(getCartProducts);
  }

  removeCartProduct(productId: string) {
    console.log('action dispatched');
    this.store.dispatch(new RemoveCart(productId));
    const userId = this.apiService.getItem(Constants.USER_UID);
    if (!productId || !userId) {
      return;
    }
    this.store.select(getCartProductIds).pipe(take(1),
      switchMap((ids: string[]) => {
        ids = ids.filter(item => item !== productId);
        console.log('product removed from cart');
        return this.apiService.setCartProducts(userId, ids);

      })
    ).subscribe(() => {
      this.store.dispatch(new RemoveCart(productId));
    });
  }

  fetchCartProduct() {
    const userId = this.apiService.getItem(Constants.USER_UID);
    this.apiService.fetchCartProducts(userId).pipe(take(1)).subscribe((res: string[]) => {
      console.log(res);
      this.store.dispatch(new FetchCartProductSuccess(res));
    });
  }

  getProducts(userId: string) {

    this.apiService.fetchProduct().pipe(take(1)).subscribe((res) => {
        let products: IProduct[] = [];
        if (res) {
          Object.keys(res).forEach(key => products.push(res[key]));
          this.store.dispatch(new FetchSuccess({products, userId}));
        }
      },
      (error) => {
        this.notificationService.error(error);
      });
  }

  pollingProducts() {
    const userId = this.apiService.getItem(Constants.USER_UID);
    this.pollingSubscriber = interval(this.pollingTimeInterval).subscribe(() => {
      this.getProducts(userId);

    });
  }
}
