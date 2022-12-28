import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  URL = 'http://localhost:5000/api';
  subject$: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) {}

  refreshData() {
    this.subject$.next('refreshed');
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.URL}/categories`);
  }

  addCategory(newCategory: Category): Observable<Category> {
    return this.http.post<Category>(`${this.URL}/categories`, newCategory);
  }

  editCategory(newCategory: Category, id: String): Observable<Category> {
    return this.http.put<Category>(`${this.URL}/categories/${id}`, newCategory);
  }

  deleteCategory(id: String): Observable<Category> {
    return this.http.delete<Category>(`${this.URL}/categories/${id}`);
  }

  getProducts(categoryName: String): Observable<Category[]> {
    return this.http.get<Category[]>(
      `${this.URL}/categories/products/${categoryName}`
    );
  }
}
