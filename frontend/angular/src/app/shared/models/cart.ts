import { CartItem } from './cart-item';

export class Cart {
  _id: String | undefined;
  status: String | undefined;
  clientId: String = '';
  products: CartItem[] = [];
  openAt: Date | undefined;
}
