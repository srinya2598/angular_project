import {ProductCategory } from './category';

export interface ProductDetails {
  productName: string;
  productCategory: ProductCategory;
  productDescription: string;
  uploadedImage: string;
  
}
