import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {IProduct} from '../../shared/models/product';
import {DashboardActions} from '../actions/dashboard';
import {Action} from '../actions';
import {state} from '@angular/animations';


export interface ProductState extends EntityState <IProduct> {
}

export const product = (product: IProduct) => product.id;

export const adapter: EntityAdapter<IProduct> = createEntityAdapter<IProduct>({
  selectId: product
});

export const initialState = adapter.getInitialState();


export function productReducer(state: ProductState = initialState, action: Action) {
  switch (action.type) {
    case DashboardActions.ADD_PRODUCT:
      console.log(action.payload);
      return adapter.addOne(action.payload, state);

    case DashboardActions.FETCH_PRODUCT:

    case DashboardActions.FETCH_SUCCESS:
      console.log('product fetched success');
      return adapter.addMany(action.payload,state);


    default:
      return state;
  }

}

export const _getEntities = (state: ProductState) => state.entities;
export const _getIds = (state: ProductState) => state.ids;
