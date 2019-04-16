import {Action} from '../actions';
import {DashboardActions} from '../actions/dashboard';
import {IProductCategory} from '../../shared/models/category';

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
  loadng: boolean,
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
  loadng: false,
};


export function productCategoryReducer(state: ProductCategoryState = initialProductCategoryState, action: Action) {
  {
    switch (action.type) {
      case DashboardActions.ADD_PRODUCT:
        console.log("categories");
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
        ;


      case  DashboardActions.FETCH_PRODUCT:
        return {
          ...state,
          loadng: true
        }
    }
    ;
  case DashboardActions.FETCH_SUCCESS:

  let i : any;
  for (i = 0; i <= action.payload; i++) {
      let categoryState = {...state};
      if (action.payload.category == IProductCategory.MOBILE_COMPUTER) {
        categoryState = {
          ...state,
          mobileComputer:state.mobileComputer.concat(action.payload)
        };
      } else if (action.payload.category == IProductCategory.ELECTRONIC_APPLIANCES) {
        categoryState = {
          ...state,
          electronic: state.electronic.concat(action.payload)        };
      } else if (action.payload.category == IProductCategory.HOME_APPLIANCES) {
        categoryState = {
          ...state,
          home:state.home.concat(action.payload)
        };
      } else if (action.payload.category == IProductCategory.MEN_CLOTHING) {
        categoryState = {
          ...state,
          men: state.men.concat(action.payload)
        };
      } else if (action.payload.category == IProductCategory.WOMEN_CLOTHING) {
        categoryState = {
          ...state,
          women: state.women.concat(action.payload)
        };
      } else if (action.payload.category == IProductCategory.KIDS_CLOTHING) {
        categoryState = {
          ...state,
          kids: state.kids.concat(action.payload)
        };
      } else if (action.payload.category == IProductCategory.TOYS) {
        categoryState = {
          ...state,
          toys:state.toys.concat(action.payload)
        };
      } else if (action.payload.category == IProductCategory.VEHICLES) {
        categoryState = {
          ...state,
          vehicles: state.vehicles.concat(action.payload)
        };
      } else if (action.payload.category == IProductCategory.BOOKS) {
        categoryState = {
          ...state,
          books: state.books.concat(action.payload)
        };
      } else if (action.payload.category == IProductCategory.MOVIES_MUSIC_VIDEOS) {
        categoryState = {
          ...state,
          movies: state.movies.concat(action.payload)
        };
      } else {
        categoryState = {
          ...state,
          others: state.others.concat(action.payload)
        };
        return categoryState;
      }
    }

  }


      default:
        return state;
    }
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



