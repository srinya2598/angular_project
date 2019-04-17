import {Action} from '../actions';
import {DashboardActions} from '../actions/dashboard';
import {IProductCategory} from '../../shared/models/category';
import {CategoryComponent} from '../component/category/category.component';
import {IProduct} from '../../shared/models/product';

export interface ProductCategoryState {
  mobileComputer: string[],
  electronic: string[],
  home: string[],
  men: string[],
  women: string[],
  kids: string[],
  toys: string[],
  vehicles: string[],
  books: string[],
  movies: string[],
  others: string[],
  loading: boolean,
}

export const initialProductCategoryState: ProductCategoryState = {

  mobileComputer: [],
  electronic: [],
  home: [],
  men: [],
  women: [],
  kids: [],
  toys: [],
  vehicles: [],
  books: [],
  movies: [],
  others: [],
  loading: false,
};



export function productCategoryReducer(state: ProductCategoryState = initialProductCategoryState, action: Action) {
  {
    switch (action.type) {
      case DashboardActions.ADD_PRODUCT:
        console.log("IProductCategory");
        let tempState = {...state};
        if (action.payload.category == IProductCategory.MOBILE_COMPUTER) {
          tempState = {
            ...state,
            mobileComputer: [...state.mobileComputer, action.payload.id]
          };
        } else if (action.payload.category == IProductCategory.ELECTRONIC_APPLIANCES) {
          tempState = {
            ...state,
            electronic: [...state.electronic, action.payload.id]
          };
        } else if (action.payload.category == IProductCategory.HOME_APPLIANCES) {
          tempState = {
            ...state,
            home: [...state.home, action.payload.id]
          };
        } else if (action.payload.category == IProductCategory.MEN_CLOTHING) {
          tempState = {
            ...state,
            men: [...state.men, action.payload.id]
          };
        } else if (action.payload.category == IProductCategory.WOMEN_CLOTHING) {
          tempState = {
            ...state,
            women: [...state.women, action.payload.id]
          };
        } else if (action.payload.category == IProductCategory.KIDS_CLOTHING) {
          tempState = {
            ...state,
            kids: [...state.kids, action.payload.id]
          };
        } else if (action.payload.category == IProductCategory.TOYS) {
          tempState = {
            ...state,
            toys: [...state.toys, action.payload.id]
          };
        } else if (action.payload.category == IProductCategory.VEHICLES) {
          tempState = {
            ...state,
            vehicles: [...state.vehicles, action.payload.id]
          };
        } else if (action.payload.category == IProductCategory.BOOKS) {
          tempState = {
            ...state,
            books: [...state.books, action.payload.id]
          };
        } else if (action.payload.category == IProductCategory.MOVIES_MUSIC_VIDEOS) {
          tempState = {
            ...state,
            movies: [...state.movies, action.payload.id]
          };
        } else {
          tempState = {
            ...state,
            others: [...state.others, action.payload.id]
          };
          return tempState;
        }


      case  DashboardActions.FETCH_PRODUCT:
        return {
          ...state,
          loading: true
        };
      case
      DashboardActions.FETCH_SUCCESS:
      {
        const products = action.payload;
        let mobileComputesId: string[] = [];
        let electronicsId: string[] = [];
        let homeId: string[] = [];
        let menId: string[] = [];
        let womenId: string[] = [];
        let kidsId: string[] = [];
        let toysId: string[] = [];
        let vehiclesId: string[] = [];
        let booksId: string[] = [];
        let moviesId: string[] = [];
        let otherId: string[] = [];


        if (products) {
          products.forEach((product: IProduct) => {
            switch (product.category) {
              case IProductCategory.MOBILE_COMPUTER:
                mobileComputesId.push(product.id);
                break;

              case IProductCategory.ELECTRONIC_APPLIANCES:
                electronicsId.push(product.id);
                break;

              case IProductCategory.HOME_APPLIANCES:
                homeId.push(product.id);
                break;

              case IProductCategory.MEN_CLOTHING:
                menId.push(product.id);
                break;

              case IProductCategory.WOMEN_CLOTHING:
                womenId.push(product.id);
                break;

              case IProductCategory.KIDS_CLOTHING:
                kidsId.push(product.id);
                break;

              case IProductCategory.TOYS:
                toysId.push(product.id);
                break;

              case IProductCategory.VEHICLES:
                vehiclesId.push(product.id);
                break;

              case IProductCategory.BOOKS:
                vehiclesId.push(product.id);
                break;

              case IProductCategory.MOVIES_MUSIC_VIDEOS:
                moviesId.push(product.id);
                break;

              default:
                otherId.push(product.id);
            }
          });
        }

        return {
          ...state,
          mobileComputer: mobileComputesId,
          electronic: electronicsId,
          home: homeId,
          men: menId,
          women: womenId,
          kids: kidsId,
          toys: toysId,
          vehicles: vehiclesId,
          books: booksId,
          movies: moviesId,
          others: otherId,
        };
      };

    };

      }
}

export const _getMobileComputerids = (state: ProductCategoryState) => state.mobileComputer;
export const _getElectronicids = (state: ProductCategoryState) => state.electronic;
export const _getHomeids = (state: ProductCategoryState) => state.home;
export const _getMenids = (state: ProductCategoryState) => state.men;
export const _getWomenids = (state: ProductCategoryState) => state.women;
export const _getKidsids = (state: ProductCategoryState) => state.kids;
export const _getToysids = (state: ProductCategoryState) => state.toys;
export const _getVehiclesids = (state: ProductCategoryState) => state.vehicles;
export const _getBooksids = (state: ProductCategoryState) => state.books;
export const _getMoviesids = (state: ProductCategoryState) => state.movies;
export const _getOthersids = (state: ProductCategoryState) => state.others;
