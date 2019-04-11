import {IProductCategory } from './category';

export interface IProduct {
  productName: string;
  productCategory: IProductCategory;
  productDescription: string;
  imageUrl: string;
  
}
