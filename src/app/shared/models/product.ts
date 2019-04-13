import {IProductCategory } from './category';

export interface IProduct {
  id: string;
  userId:string;
  name: string;
  category: IProductCategory;
  description: string;
  imageUrl: string;
  
}
