import { Action } from './index';
import { IProduct } from '../../shared/models/product';
import { IProductCategory } from '../../shared/models/category';

export enum DashboardActions {
  ADD_PRODUCT = '[dashboard] add product',
  FETCH_PRODUCT = '[dashboard] fetch product',
  FETCH_SUCCESS = '[dashboard] fetch success',
  SELECT_CATEGORY = '[dashboard] select category'
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

  constructor(public  payload: IProduct[]) {

  }
}

export class SelectCategory implements Action {
  readonly type = DashboardActions.SELECT_CATEGORY;

  constructor(public  payload: IProductCategory) {

  }
}


