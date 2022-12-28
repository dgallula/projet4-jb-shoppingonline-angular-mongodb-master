import { Address } from '../interfaces/address';
import { Order } from './order';
export class User {
  _id?: String | undefined;
  userId: String | undefined;
  firstName: String | undefined;
  lastName: String | undefined;
  phoneNumber: String | undefined;
  email?: String | undefined;
  orders?: Order[] | undefined;
  role?: string | undefined;
  address: Address | undefined;
  emailVerified?: boolean | undefined;
}
