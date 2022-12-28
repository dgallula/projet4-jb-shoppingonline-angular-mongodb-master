import { Address } from '../interfaces/address';
import { PaymentMethod } from '../interfaces/payment-method';

export class Order {
  _id?: String | undefined;
  cart: String = '';
  orderDate?: Date | undefined;
  deliveryDate: Date | undefined;
  totalPrice: Number | undefined;
  creditCard: PaymentMethod | undefined;

  status?: String = '';
  user: String = '';
  address: Address | undefined;
}
