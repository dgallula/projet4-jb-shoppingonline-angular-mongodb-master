import { UntypedFormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/models/product';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItem } from 'src/app/shared/models/cart-item';
import { Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product | undefined;
  @Input() categoryName: String | undefined;
  @Output() deletProduct = new EventEmitter<any>();

  quantity = new UntypedFormControl('', Validators.required);
  cartItem: CartItem | undefined;
  quantityArray: Number[] = [];

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private router: Router,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.setQuantityArray();
  }

  setQuantityArray() {
    let maxQuantity = 10;

    for (let i = 1; i <= maxQuantity; i++) {
      this.quantityArray.push(i);
    }
  }

  editProduct(productToEdit: Product) {
    this.router.navigateByUrl('products/edit', {
      state: { product: productToEdit },
    });
  }

  delProduct(docId: any) {
    this.deletProduct.emit(docId);
  }

  addToCart(product: Product) {
    const cart = this.cartService.get();
    this.cartItem = {
      cartId: cart!,
      quantity: this.quantity.value,
      product: `${product._id}`,
    };
    this.productsService
      .updateStock(+this.quantity.value, product._id!, 'subtract')
      .subscribe(() => {
        this.productsService.refreshData();
      });

    this.cartService.addItemToCart(this.cartItem).subscribe((result) => {
      this.cartService.refreshData();
    });
  }
}
