import { DisplayProduct } from './../interfaces/display-product';
import { Product } from './../models/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  CART_ITEM_URL = 'http://localhost:5000/api/carts/products';
  CART_URL = 'http://localhost:5000/api/carts';

  displayProducts: DisplayProduct[] = [];
  cartProducts: CartItem[] = [];
  cartId: String | undefined;

  subject$: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) {}

  refreshData() {
    this.subject$.next('refreshed');
  }

  creatNewCart(userId: String): Observable<Cart> {
    return this.http.post<Cart>(`${this.CART_URL}`, { clientId: userId });
  }

  getCartItems(userId: String): Observable<Cart> {
    return this.http.get<Cart>(`${this.CART_ITEM_URL}/${userId}`);
  }

  getCartItemsByCartId(cartId: String): Observable<Cart> {
    return this.http.get<Cart>(
      `http://localhost:5000/api/cart/products/${cartId}`
    );
  }

  addItemToCart(newItem: CartItem) {
    return this.http.post<CartItem>(
      `${this.CART_ITEM_URL}/add-product`,
      newItem
    );
  }

  updateCartStatus(userId: String) {
    return this.http
      .put<Cart>(`${this.CART_URL}/${this.cartId}`, { status: 'close' })
      .subscribe((res) => {
        this.creatNewCart(userId).subscribe((resultCart) => {
          this.set(resultCart._id!);
        });
        this.refreshData();
      });
  }

  deleteItem(docId: String): Observable<CartItem> {
    return this.http.delete<CartItem>(`${this.CART_ITEM_URL}/${docId}`);
  }

  set(cartId: String) {
    this.cartId = cartId;
  }
  get() {
    return this.cartId;
  }

  prepareToDisplay(allProducts: Product[], cartItems: CartItem[]) {
    this.displayProducts = [];
    cartItems!.forEach((cartProduct) => {
      const cartProductDetails = allProducts?.find(
        (product) => product._id === cartProduct.product
      );

      this.displayProducts?.push({
        name: cartProductDetails?.name,
        image: cartProductDetails?.image,
        price: cartProductDetails?.price,
        category: cartProductDetails?.category,
        quantity: cartProduct.quantity,
        totalPrice: cartProduct.totalPrice,
        id: cartProduct._id,
        productId: cartProduct.product,
      });
    });
    return this.displayProducts;
  }
}
