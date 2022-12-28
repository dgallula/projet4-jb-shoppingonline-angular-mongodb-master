import { FilesHandleService } from './../../../shared/services/files-handle.service';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/shared/models/category';
import { Product } from 'src/app/shared/models/product';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  title: String = 'Add new product';
  image: any;
  productName: String | undefined;
  productPrice: number | undefined;
  productStock: number | undefined;
  productCategory = new UntypedFormControl('', Validators.required);
  categories: Category[] | undefined;
  product: Product | undefined;
  editMode: boolean = false;
  docId: String = '';
  fileName = '';
  fileError: boolean = false;

  productForm = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.pattern("^(a-z|A-Z|0-9)*[^#$^&*()'@;{}!?|,/~.+=]*$"),
      ],
    ],
    price: ['', [Validators.required, Validators.max(3000), Validators.min(1)]],
    stock: ['', [Validators.required, Validators.max(3000), Validators.min(1)]],
  });

  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private filesService: FilesHandleService,
    private notificaionService: NotificationService
  ) {}

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
    const url = this.router.url;

    if (url.endsWith('edit')) {
      try {
        this.editMode = true;
        this.title = 'Edit Product';
        this.productCategory = new UntypedFormControl(
          window.history.state.product.category,
          Validators.required
        );
        this.docId = window.history.state.product._id;
        this.productName = window.history.state.product.name;
        this.productPrice = window.history.state.product.price;
        this.productStock = window.history.state.product.stock;
      } catch (error) {}
    }
  }

  getErrorMessage(key: string) {
    if (this.productForm.get(key)?.errors?.['required']) {
      return 'You must enter a value';
    }
    if (this.productForm.get(key)?.errors?.['min']) {
      return `The ${key} can't be less then 1`;
    }
    if (this.productForm.get(key)?.errors?.['max']) {
      return `The ${key} can't be bigger then 3000`;
    }
    if (this.productForm.get(key)?.errors?.['pattern']) {
      return `The ${key} can contain only letters, number and special characters like % or -`;
    }
    return;
  }

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = {
        preview: URL.createObjectURL(event.target.files[0]),
        data: event.target.files[0],
      };
      this.image = file;
      this.fileName = file.data.name;
      this.fileError = false;
    }
  }

  onSubmit() {
    const formData = new FormData();
    const categoryName = this.categories?.find(
      (category) => category._id === this.productCategory.value
    )?.name;
    if (!this.editMode && !this.image) {
      this.fileError = true;
      return;
    }

    if (this.image) {
      formData.append('file', this.image.data);
      this.filesService.uploadImage(formData, 'products-image');
    }

    this.product = {
      name: this.productForm.value.name,
      price: this.productForm.value.price,
      stock: this.productForm.value.stock,
      category: this.productCategory.value,
      image: this.image ? this.image.data.name : undefined,
    };

    if (this.editMode) {
      this.productsService
        .editProduct(this.product, this.docId)
        .subscribe((result) => {
          this.notificaionService.showSnackBar(
            'Product was updated successfully',
            'snackbar__info'
          );
          this.router.navigate([`products/${categoryName}`]);
        });
    } else {
      this.productsService.addProduct(this.product).subscribe((result) => {
        this.notificaionService.showSnackBar(
          'Product was added successfully',
          'snackbar__success'
        );
        this.router.navigate([`products/${categoryName}`]);
      });
    }
  }
}
