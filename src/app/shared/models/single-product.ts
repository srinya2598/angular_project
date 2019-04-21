import { IProductCategory } from './category';

export interface ISingleProduct {
  category: IProductCategory,
  country: string,
  description: string,
  email: string,
  firstName: string,
  id: string,
  imageUrl: string,
  lastName: string,
  name: string,
  phoneNo: number,
  profileUrl: string,
  price: number,
}
