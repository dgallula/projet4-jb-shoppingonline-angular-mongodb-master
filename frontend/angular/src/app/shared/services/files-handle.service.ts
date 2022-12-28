import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilesHandleService {
  URL = 'http://localhost:5000/api';
  BILL_URL = 'http://localhost:5000/api/users/orders/bill';

  constructor(private http: HttpClient) {}

  uploadImage(image: FormData, folder: string) {
    return this.http.post(`${this.URL}/${folder}`, image).subscribe((res) => {
      console.log(res);
    });
  }

  downloadOrderBill(orderId: String) {
    return this.http.get(`${this.BILL_URL}/${orderId}`, {
      responseType: 'base64' as 'json',
    });
  }

  createOrderBill(order: any) {
    this.http.post(`${this.BILL_URL}`, { order }).subscribe((res) => {
      console.log(res);
    });
  }
}
