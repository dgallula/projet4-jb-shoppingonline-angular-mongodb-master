import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/shared/models/category';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  allCategories: Category[] | undefined;

  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private notificaionService: NotificationService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoriesService.getAllCategories().subscribe((resultArray) => {
      this.allCategories = resultArray;
    });
  }

  editCategory(categoryToEdit: Category) {
    this.router.navigateByUrl('categories/edit', {
      state: { category: categoryToEdit },
    });
  }

  delCategory(doc: any) {
    this.categoriesService.deleteCategory(doc._id).subscribe((result) => {
      this.notificaionService.showSnackBar(
        'Category was deleted successfully',
        'snackbar__danger'
      );
      this.categoriesService.refreshData();
      this.getAllCategories();
    });
  }
}
