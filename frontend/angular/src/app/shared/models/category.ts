import { Product } from './product';

export class Category {
  name: String = '';
  image: String = '';
  _id?: String = '';
  products: Array<Product> = [];
}
