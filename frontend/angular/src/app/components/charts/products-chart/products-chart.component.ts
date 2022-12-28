import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { Product } from 'src/app/shared/models/product';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Order } from 'src/app/shared/models/order';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-products-chart',
  templateUrl: './products-chart.component.html',
  styleUrls: ['./products-chart.component.scss'],
})
export class ProductsChartComponent implements OnInit {
  allProducts: Product[] = [];
  @Input() orders: Order[] = [];
  isDone: boolean = false;

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
        text: 'Product quantities ordered',
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
      label: 'quantity',
      backgroundColor: ['#748ffc6d'],
      hoverBackgroundColor: ['#5c7cfa'],
      borderRadius: 5,
    },
  ];

  constructor(
    private productsService: ProductsService,
    private cartsService: CartService
  ) {}

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe((products) => {
      this.allProducts = products;
      this.setChartArrays();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.orders = changes['orders'].currentValue;

    setTimeout(() => {
      this.isDone = true;
    }, 2500);
  }

  setChartArrays() {
    let labels: String[] = [];
    let data: number[] = [];
    this.orders.forEach((order) => {
      this.cartsService.getCartItemsByCartId(order.cart).subscribe((items) => {
        const productsArray = this.cartsService.prepareToDisplay(
          this.allProducts,
          items.products
        );
        productsArray.forEach((product) => {
          const lableIndex = labels.findIndex(
            (label) => label === product?.name
          );

          if (lableIndex === -1) {
            labels.push(product.name!);
            data.push(+product.quantity!);
          } else {
            data[lableIndex] += +product.quantity!;
          }
        });
        this.barChartData[0].data = data;
      });
    });
    this.barChartLabels = labels;
  }
}
