import { AuthService } from 'src/app/shared/services/auth.service';
import { Product } from 'src/app/shared/models/product';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartItem } from 'src/app/shared/models/cart-item';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { NavigationEnd, Router } from '@angular/router';
import { DisplayProduct } from 'src/app/shared/interfaces/display-product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  @Output() updateCartLength = new EventEmitter<any>();
  cartProducts: CartItem[] | undefined;
  cartId: String | undefined;
  overallPrice: number = 0;
  displayProducts: DisplayProduct[] = [];
  allProducts: Product[] | undefined;
  user: any;

  constructor(
    private cartService: CartService,
    private productsService: ProductsService,
    private router: Router,
    private auth: AuthService
  ) {
    this.router.events.subscribe((event) => {
      if (
        event instanceof NavigationEnd &&
        !this.router.url.includes('authentication')
      ) {
        this.user = this.auth.getUser();
        if (this.user !== null) {
          this.getAllProducts();
        }
      }
    });
    this.cartService.subject$.subscribe(() => {
      this.getAllProducts();
    });
  }

  ngOnInit(): void {}

  getAllProducts() {
    this.productsService.getAllProducts().subscribe((result) => {
      this.allProducts = result;
    });

    this.cartService.getCartItems(this.user.uid).subscribe((result) => {
      if (result !== null) {
        if (result) {
          this.cartId = result._id;
          this.cartService.set(this.cartId!);
          this.cartProducts = result.products;
          this.sumOverallPrice('add');
          this.displayProducts = this.cartService.prepareToDisplay(
            this.allProducts!,
            result.products
          );

          this.updateCartLength.emit(result.products.length);
        }
      } else {
        this.cartService.creatNewCart(this.user.uid).subscribe((data) => {
          this.cartId = data._id;
        });
      }
    });
  }

  updateCart(product: CartItem) {
    this.sumOverallPrice('remove');
  }

  sumOverallPrice(operation: string) {
    this.overallPrice = 0;
    this.cartProducts?.forEach((product) => {
      if (operation === 'add') {
        this.overallPrice += +product.totalPrice!;
      }
      if (operation === 'remove') {
        this.overallPrice -= +product.totalPrice!;
      }
    });
  }

  placeOrder() {
    this.router.navigateByUrl('/orders/add', {
      state: {
        products: this.displayProducts,
        cartTotalPrice: this.overallPrice,
        cart: this.cartId,
      },
    });
  }
}
