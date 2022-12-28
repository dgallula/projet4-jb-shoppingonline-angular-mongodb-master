import { Order } from './../../shared/models/order';
import { OrdersService } from './../../shared/services/orders.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  orders: Order[] = [];
  isLoading: boolean = true;
  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.ordersService.getAllOrders().subscribe((data) => {
      this.orders = data;
    });
    setTimeout(() => {
      this.isLoading = false;
    }, 2495);
  }
}
