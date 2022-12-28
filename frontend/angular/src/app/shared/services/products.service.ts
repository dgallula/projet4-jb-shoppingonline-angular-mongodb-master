import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  subject$: Subject<any> = new Subject<any>();
  URL = 'http://localhost:5000/api/products';
  products: Product[] | undefined;

  constructor(private http: HttpClient) {}

  refreshData() {
    this.subject$.next('refreshed');
  }

  set setProducts(products: Product[]) {
    this.products = products;
  }

  get getProducts() {
    return this.products;
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.URL}`);
  }

  addProduct(newProduct: Product): Observable<Product> {
    return this.http.post<Product>(`${this.URL}`, newProduct);
  }

  editProduct(newProduct: Product, id: String): Observable<Product> {
    return this.http.put<Product>(`${this.URL}/${id}`, newProduct);
  }

  updateStock(
    quantity: number,
    id: String,
    operation: String
  ): Observable<Product> {
    return this.http.put<Product>(`${this.URL}/updateStock/${id}`, {
      quantity,
      operation,
    });
  }

  deleteProduct(productId: String): Observable<Product> {
    return this.http.delete<Product>(`${this.URL}/${productId}`);
  }
}
