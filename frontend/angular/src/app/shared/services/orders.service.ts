import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  USERS_ORDERS_URL = 'http://localhost:5000/api/users/orders';
  ORDERS_URL = 'http://localhost:5000/api/orders';
  orders: Order[] | undefined;

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.ORDERS_URL}`);
  }

  addOrder(newOrder: Order): Observable<Order> {
    return this.http.post<Order>(`${this.USERS_ORDERS_URL}`, newOrder);
  }

  getUserOrders(userId: String): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.USERS_ORDERS_URL}/${userId}`);
  }

  updateOrderStatus(orderId: String, status: String): Observable<Order> {
    return this.http.put<Order>(`${this.USERS_ORDERS_URL}/${orderId}`, {
      status,
    });
  }

  set setOrders(orders: Order[]) {
    this.orders = orders;
  }

  get getOrders() {
    return this.orders;
  }
}
