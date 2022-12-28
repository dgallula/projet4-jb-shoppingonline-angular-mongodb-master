import { UntypedFormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Product } from './../../../shared/models/product';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Category } from 'src/app/shared/models/category';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  categoriesMenu: Category[] = [];
  displayName: String | undefined;
  numOfProductsInCart: number | undefined;
  allProducts: Product[] | undefined;
  searchKey: string | undefined;
  options: String[] = [];
  filteredOptions: Observable<String[]> | undefined;
  searchControl = new UntypedFormControl('');
  @ViewChild(MatAutocompleteTrigger)
  autocomplete!: MatAutocompleteTrigger;

  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private router: Router,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    if (this.auth.isLoggedIn) {
      this.categoriesService.getAllCategories().subscribe((data) => {
        this.categoriesMenu = data;
      });
      this.productsService.getAllProducts().subscribe((data) => {
        this.allProducts = data;
        this.setOptions();
      });
      this.filteredOptions = this.searchControl.valueChanges.pipe(
        startWith(''),
        map((value) => this.filter(value || ''))
      );
    }
  }

  filter(value: string): String[] {
    const filterValue = value.toLowerCase();

    return this.options?.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  setOptions() {
    this.allProducts?.forEach((product) => {
      this.options?.push(product.name.toLocaleLowerCase());
    });
  }

  updateCartProducts(length: any) {
    this.numOfProductsInCart = length;
  }

  navigateMenu(categry: String) {
    this.router.navigate([`/products/${categry}`]);
  }

  search() {
    this.autocomplete.closePanel();
    const searchKey = this.searchControl.value;

    const fillteredProducts = this.allProducts!.filter((product) =>
      product.name.toLocaleLowerCase().includes(searchKey)
    );
    this.productsService.setProducts = fillteredProducts;
    this.productsService.refreshData();
    this.router.navigateByUrl('/products', {
      state: { searchWord: this.searchControl.value },
    });
  }

  signOut() {
    this.auth.SignOut();
  }
}
