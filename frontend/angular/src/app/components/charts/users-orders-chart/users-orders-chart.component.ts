import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { Order } from 'src/app/shared/models/order';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-users-orders-chart',
  templateUrl: './users-orders-chart.component.html',
  styleUrls: ['./users-orders-chart.component.scss'],
})
export class UsersOrdersChartComponent implements OnInit, OnChanges {
  @Input() allOrders: Order[] = [];
  dataReady: boolean = false;

  barChartOptions: ChartOptions = {
    responsive: true,
    layout: {
      padding: 10,
    },
    font: {
      weight: '700',
    },
    scales: {
      x: {
        ticks: {
          color: '#fff',
          font: {
            size: 14,
          },
        },
      },
      y: {
        ticks: {
          color: '#fff',
          font: {
            size: 14,
          },
          stepSize: 1,
        },
      },
    },

    plugins: {
      legend: {
        labels: {
          color: '#fff',
          font: {
            size: 16,
          },
        },
      },
      tooltip: {
        callbacks: {
          labelColor: function (context) {
            return {
              borderColor: '#748ffc',
              backgroundColor: '#748ffc',
            };
          },
        },
      },

      title: {
        display: true,
        text: 'Number of orders by client',
        color: '#fff',
        font: {
          size: 18,
        },
      },
    },
  };
  barChartLabels: any[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataset[] = [
    {
      data: [],
      label: 'orders',
      backgroundColor: ['#4dabf76d'],
      hoverBackgroundColor: ['#339af0'],
      borderRadius: 5,
    },
  ];

  constructor(
    private ordersService: OrdersService,
    private usersService: UserService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.allOrders = changes['allOrders'].currentValue;
    if (this.allOrders.length > 0) {
      this.createChart();
    }
    setTimeout(() => {
      this.dataReady = true;
    }, 2500);
  }

  ngOnInit(): void {}

  createChart() {
    let labels: string[] = [];
    let ordersCount: number[] = [];
    this.allOrders.forEach((order) => {
      this.ordersService.getUserOrders(order.user).subscribe((userOrders) => {
        this.usersService
          .getSingleUser(userOrders[0].user)
          .subscribe((userInfo) => {
            if (
              labels.find(
                (user) => `${userInfo.firstName} ${userInfo.lastName}` === user
              )
            ) {
              return;
            } else {
              labels.push(`${userInfo.firstName} ${userInfo.lastName}`);
              ordersCount.push(userOrders.length);
            }
            this.barChartLabels = labels;
            this.barChartData[0].data = ordersCount;
          });
      });
    });
  }
}
