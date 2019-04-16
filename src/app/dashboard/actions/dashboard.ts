import {Action} from './index';
import {IProduct} from '../../shared/models/product';
import {adapter} from '../reducers/product';
import {state} from '@angular/animations';

export enum DashboardActions {
  ADD_PRODUCT = '[dashboard] addproduct',
  FETCH_PRODUCT = '[dashboard] fetchproduct',
  FETCH_SUCCESS = '[dashboard] fetchsuccess',
}

export class AddProduct implements Action {
  readonly type = DashboardActions.ADD_PRODUCT;


  constructor(public payload: IProduct) {

  }
}

export class FetchProduct implements Action{
  readonly type = DashboardActions.FETCH_PRODUCT;

}

export class FetchSuccess implements Action{
  readonly type = DashboardActions.FETCH_SUCCESS;

  constructor (public  payload: IProduct[]){

  }
}


