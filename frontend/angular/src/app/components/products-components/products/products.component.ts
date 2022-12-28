import { Product } from './../../../shared/models/product';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CategoriesService } from 'src/app/shared/services/categories.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] | undefined;
  categoryName: String = '';

  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private notificaionService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.categoryName = this.route.snapshot.params['categoryName'];
        this.getProducts();
      }
    });
    this.productsService.subject$.subscribe(() => {
      this.getProducts();
    });
  }

  getProducts() {
    if (this.categoryName) {
      this.categoriesService
        .getProducts(this.categoryName)
        .subscribe((productsData) => {
          this.productsService.setProducts = productsData[0].products;
          this.products = this.productsService.getProducts;
        });
    } else {
      this.products = this.productsService.getProducts;
    }
  }

  delete(docId: string) {
    this.productsService.deleteProduct(docId).subscribe((result) => {
      this.notificaionService.showSnackBar(
        'Product was deleted successfully',
        'snackbar__danger'
      );
      this.productsService.refreshData();
    });
  }

  ngOnInit(): void {
    this.getProducts();
  }
}
