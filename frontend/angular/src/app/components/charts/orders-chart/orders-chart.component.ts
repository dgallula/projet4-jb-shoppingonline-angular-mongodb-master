import { Order } from './../../../shared/models/order';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-orders-chart',
  templateUrl: './orders-chart.component.html',
  styleUrls: ['./orders-chart.component.scss'],
})
export class OrdersChartComponent implements OnInit, OnChanges {
  @Input() allOrders: Order[] = [];
  dataReady: boolean = false;

  lineChartOptions = {
    responsive: true,
  };
  chartLegend = true;
  chartPlugins = [];

  chartOptions: ChartOptions = {
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
        beginAtZero: true,
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
              borderColor: '#b197fc',
              backgroundColor: '#b197fc',
            };
          },
        },
      },

      title: {
        display: true,
        text: 'Number of orders per month',
        color: '#fff',
        font: {
          size: 18,
        },
      },
    },
    elements: {
      line: {
        tension: 0.5,
      },
    },
  };
  chartLabels: any[] = [];
  chartType: ChartType = 'line';
  chartData: ChartDataset[] = [
    {
      data: [],
      label: 'orders',
      borderColor: ['#b197fc8e'],

      backgroundColor: ['#b197fc8e'],
      pointHoverBorderColor: ['#b197fc'],
      pointBorderColor: ['#b197fc8e'],
      pointBackgroundColor: ['#b197fc8e'],
      pointBorderWidth: [7],
      pointHoverBorderWidth: [10],
    },
  ];

  constructor() {}
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
      let labelDate = new Date(order.orderDate!)
        .toLocaleDateString()
        .substring(3)
        .replace('.', '/');
      if (labelDate.substring(0, 2).endsWith('/')) {
        labelDate = '0' + labelDate;
      }
      const lableIndex = labels.indexOf(labelDate);
      if (lableIndex === -1) {
        labels.push(labelDate);
        ordersCount[labels.indexOf(labelDate)] = 1;
      } else {
        ordersCount[lableIndex] += 1;
      }
      labels.sort((a, b) => +a.substring(0, 2) - +b.substring(0, 2));
      ordersCount.sort(
        (a, b) => labels.indexOf(a.toString()) - labels.indexOf(b.toString())
      );
      this.chartLabels = labels;
      this.chartData[0].data = ordersCount;
    });
  }
}
