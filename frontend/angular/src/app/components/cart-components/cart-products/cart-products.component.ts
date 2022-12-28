import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.scss'],
})
export class CartProductsComponent implements OnInit {
  @Input() displayProduct: any;
  @Output() removeItem = new EventEmitter<any>();

  constructor(
    private cartsService: CartService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {}

  deleteCartItem(docId: String, productToUpdate: String) {
    this.productsService
      .updateStock(this.displayProduct.quantity, productToUpdate, 'add')
      .subscribe(() => {
        this.productsService.refreshData();
      });
    this.cartsService.deleteItem(docId).subscribe((result) => {
      this.removeItem.emit();
      this.cartsService.refreshData();
    });
  }
}
