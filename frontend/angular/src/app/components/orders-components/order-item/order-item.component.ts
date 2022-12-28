import { DisplayProduct } from './../../../shared/interfaces/display-product';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent implements OnInit {
  @Input() displayItem: DisplayProduct | undefined;

  constructor() {}

  ngOnInit(): void {}
}
