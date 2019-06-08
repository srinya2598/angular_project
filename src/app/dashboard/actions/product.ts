import {IProduct} from '@ec-shared/models/product';
import {IProductCategory} from '@ec-shared/models/category';
import {Action} from '@ec-core/actions';
import {ISingleProduct} from '@ec-shared/models/single-product';

export enum DashboardActions {
  ADD_PRODUCT = '[dashboard] add product',
  FETCH_PRODUCT = '[dashboard] fetch product',
  FETCH_SUCCESS = '[dashboard] fetch success',
  SELECT_CATEGORY = '[dashboard] select category',
  ADD_CART = '[dashboard] add to cart'
}

export class AddProduct implements Action {
  readonly type = DashboardActions.ADD_PRODUCT;


  constructor(public payload: IProduct) {

  }
}

export class FetchProduct implements Action {
  readonly type = DashboardActions.FETCH_PRODUCT;

}

export class FetchSuccess implements Action {
  readonly type = DashboardActions.FETCH_SUCCESS;


  constructor(public  payload: { products: IProduct[], userId: string }) {

  }
}

export class SelectCategory implements Action {
  readonly type = DashboardActions.SELECT_CATEGORY;

  constructor(public  payload: IProductCategory) {

  }
}

export class AddCart implements Action {
  readonly type = DashboardActions.ADD_CART;

  constructor(public payload: string) {

  }
}
