import {Action} from './index';
import {IProduct} from '../../shared/models/product';

export enum DashboardActions {
  ADD_PRODUCT = '[dashboard] addproduct',
}

export class AddProduct implements Action {
  readonly type = DashboardActions.ADD_PRODUCT;

  constructor(public payload: IProduct) {

  }
}
