import { RootState } from '../../root-reducer';
import { _getEntities, _getIds, _getSelectedProduct, productReducer, ProductState } from './product';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  _getBooksids,
  _getElectronicids,
  _getHomeids,
  _getIsProductLoaded,
  _getKidsids,
  _getMenids,
  _getMobileComputerids,
  _getMoviesids,
  _getOthersids,
  _getSelectedCategory,
  _getToysids,
  _getVehiclesids,
  _getWomenids,
  _getUserProducts,
  productCategoryReducer,
  ProductCategoryState
} from './product-category';
import { _getLoggedInUser } from '../../auth/reducer/auth';

export interface State {
  product: ProductState;
  productCategory: ProductCategoryState;
}

export interface ProductRootState extends RootState {
  product: State;
}

export const productRootReducer = {
  product: productReducer,
  productCategory: productCategoryReducer
};

export const getProductRootState = createFeatureSelector<State>('product');

export const getProductState = createSelector(getProductRootState, (state) => state.product);
export const getProductCategoryState = createSelector(getProductRootState, (state) => state.productCategory);

export const getIds = createSelector(getProductState, _getIds);

export const getEntities = createSelector(getProductState, _getEntities);

// Id selectors for all categories
export const getMobileComputerIds = createSelector(
  getProductCategoryState,
  _getMobileComputerids
);

export const getElectronicIds = createSelector(
  getProductCategoryState,
  _getElectronicids
);

export const getHomeIds = createSelector(
  getProductCategoryState,
  _getHomeids
);

export const getMenIds = createSelector(
  getProductCategoryState,
  _getMenids
);

export const getWomenIds = createSelector(
  getProductCategoryState,
  _getWomenids
);

export const getKidsIds = createSelector(
  getProductCategoryState,
  _getKidsids
);

export const getToysIds = createSelector(
  getProductCategoryState,
  _getToysids
);

export const getVehiclesIds = createSelector(
  getProductCategoryState,
  _getVehiclesids
);

export const getBooksIds = createSelector(
  getProductCategoryState,
  _getBooksids
);

export const getMoviesIds = createSelector(
  getProductCategoryState,
  _getMoviesids
);

export const getOthersIds = createSelector(
  getProductCategoryState,
  _getOthersids
);
export const getIsProductLoaded = createSelector(
  getProductCategoryState,
  _getIsProductLoaded
);
export const getSelectedCategory = createSelector(
  getProductCategoryState,
  _getSelectedCategory
);

export const getUserProducts = createSelector(
  getProductCategoryState,
  _getUserProducts
);

// Fetching the actual product objects using ids and entities

export const getMobileAndComputers = createSelector(
  getMobileComputerIds,
  getEntities,
  (ids, entities) => {
    return ids.map(id => entities[id]);
  });

export const getElectronicAppliances = createSelector(
  getElectronicIds,
  getEntities,
  (ids, entities) => {
    return ids.map(id => entities[id]);
  });

export const getHomeAppliances = createSelector(
  getHomeIds,
  getEntities,
  (ids, entities) => {
    return ids.map(id => entities[id]);
  });

export const getMenCloathings = createSelector(
  getMenIds,
  getEntities,
  (ids, entities) => {
    return ids.map(id => entities[id]);
  });

export const getWomenCloathings = createSelector(
  getWomenIds,
  getEntities,
  (ids, entities) => {
    return ids.map(id => entities[id]);
  });

export const getKidCloathings = createSelector(
  getKidsIds,
  getEntities,
  (ids, entities) => {
    return ids.map(id => entities[id]);
  });

export const getToys = createSelector(
  getToysIds,
  getEntities,
  (ids, entities) => {
    return ids.map(id => entities[id]);
  });

export const getVehicles = createSelector(
  getVehiclesIds,
  getEntities,
  (ids, entities) => {
    return ids.map(id => entities[id]);
  });

export const getBooks = createSelector(
  getBooksIds,
  getEntities,
  (ids, entities) => {
    return ids.map(id => entities[id]);
  });

export const getMovies = createSelector(
  getMoviesIds,
  getEntities,
  (ids, entities) => {
    return ids.map(id => entities[id]);
  });

export const getOtherItems = createSelector(
  getOthersIds,
  getEntities,
  (ids, entities) => {
    return ids.map(id => entities[id]);
  });

export const getLoggedInUserProductId = createSelector(
  getUserProducts,
  getEntities,
  (ids, entities) => {
    return ids.map(id => entities[id]);
  });
export const getSelectedProduct = (state: State, id: string) => _getSelectedProduct(getProductState(state), id);

