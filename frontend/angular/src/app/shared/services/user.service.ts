import { User } from './../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  URL = 'http://localhost:5000/api/users';
  constructor(private http: HttpClient) {}

  getSingleUser(key: String): Observable<User> {
    return this.http.get<User>(`${this.URL}/${key}`);
  }

  updateUser(userInfo: User, docId: String): Observable<User> {
    return this.http.put<User>(`${this.URL}/${docId}`, userInfo);
  }
}
