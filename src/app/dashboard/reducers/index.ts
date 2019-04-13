import {authReducer, AuthState} from '../../auth/reducer/auth';
import {RootState} from '../../root-reducer';
import {_getEntity, _getIds, adapter, productReducer, ProductState} from './product';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {EntitySelectors} from '@ngrx/entity/src/models';
import {
  _getBooksids,
  _getElectronicids,
  _getHomeids,
  _getKidsids,
  _getMenids,
  _getMobileComputerids, _getMoviesids, _getOthersids, _getToysids, _getVehiclesids,
  _getWomenids, productCategoryReducer,
  ProductCategoryState
} from './product-category';

export interface State {
  product: ProductState;
  productCategory: ProductCategoryState;
}

export interface ProductRootState extends RootState {
  product: State;
}

export const productRootReducer = {
  product: productReducer,
  productCategory:productCategoryReducer
};

export const getProductRootState = createFeatureSelector<State>('product');

export const getProductState = createSelector(getProductRootState, (state) => state.product);
export const getProductCategoryState = createSelector(getProductRootState, (state) => state.productCategory);

export const getIds = createSelector(getProductState, _getIds);
export const getEntities = createSelector(getProductState, _getEntity);



export const getMobileComputerids = createSelector(getProductCategoryState, _getMobileComputerids);
export const getElectronicids = createSelector(getProductCategoryState, _getElectronicids);
export const getHomeids = createSelector(getProductCategoryState, _getHomeids);
export const getMenids = createSelector(getProductCategoryState, _getMenids);
export const getWomenids = createSelector(getProductCategoryState, _getWomenids);
export const getKidsids = createSelector(getProductCategoryState, _getKidsids);
export const getToysids = createSelector(getProductCategoryState, _getToysids);
export const getVehiclesids = createSelector(getProductCategoryState, _getVehiclesids);
export const getBooksids = createSelector(getProductCategoryState, _getBooksids);
export const getMoviesids = createSelector(getProductCategoryState, _getMoviesids);
export const getOthersids = createSelector(getProductCategoryState, _getOthersids);
