import { Action } from '../actions';
import { DashboardActions } from '../actions/product';
import { IProductCategory } from '../../shared/models/category';
import { IProduct } from '../../shared/models/product';
import { IUser } from '../../shared/models/users';

export interface ProductCategoryState {
  productsLoaded: boolean;
  selectedCategory: IProductCategory;
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
  loggedInUserProductId: string[],
  loading: boolean,
}

export const initialProductCategoryState: ProductCategoryState = {
  productsLoaded: false,
  selectedCategory: null,
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
  loggedInUserProductId: [],

};


export function productCategoryReducer(state: ProductCategoryState = initialProductCategoryState, action: Action) {

  switch (action.type) {
    case DashboardActions.ADD_PRODUCT:
      let tempState = { ...state, loggedInUserProductId: [...state.loggedInUserProductId, action.payload.id] };
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
      }
      return tempState;


    case DashboardActions.FETCH_SUCCESS:
      const products = action.payload.products;
      let userId = action.payload.userId;
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
      let loggedInUserProductId: string[] = [];

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
              booksId.push(product.id);
              break;

            case IProductCategory.MOVIES_MUSIC_VIDEOS:
              moviesId.push(product.id);
              break;

            default:
              otherId.push(product.id);
          }

        });
      }

      console.log("UserId",userId);

      loggedInUserProductId = products.filter((product) => product.userId == userId).map((res) => {
        console.log(res);
        return res.id;
      });
      return {
        ...state,
        productsLoaded: true,
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
        loggedInUserProductId: loggedInUserProductId,
      };

    case DashboardActions.SELECT_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload
      };

    default:
      return state;
  }

}

export const _getIsProductLoaded = (state: ProductCategoryState) => state.productsLoaded;
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
export const _getSelectedCategory = (state: ProductCategoryState) => state.selectedCategory;
export const _getLoggedInUserProductsId = (state: ProductCategoryState) => state.loggedInUserProductId;

