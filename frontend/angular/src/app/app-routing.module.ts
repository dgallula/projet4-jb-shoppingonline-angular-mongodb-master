import { VerifyEmailComponent } from './components/auth-components/verify-email/verify-email.component';
import { ProductsComponent } from './components/products-components/products/products.component';
import { NgModule } from '@angular/core';
import { AddCategoryComponent } from './components/categories/add-category/add-category.component';
import { CategoriesComponent } from './components/categories/categories/categories.component';
import { AddProductComponent } from './components/products-components/add-product/add-product.component';
import { OrderComponent } from './components/orders-components/order/order.component';
import { OrdersViewComponent } from './components/orders-components/orders-view/orders-view.component';
import { LoginComponent } from './components/auth-components/login/login.component';
import { ForgotPasswordComponent } from './components/auth-components/forgot-password/forgot-password.component';
import { RegistrationComponent } from './components/auth-components/registration/registration.component';
import { ProfileComponent } from './components/user-components/profile/profile.component';
import { EditProfileComponent } from './components/user-components/edit-profile/edit-profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SecureInnerPagesGuard } from './shared/guard/secure-inner-pages.guard';
import { AuthGuard } from './shared/guard/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },

  {
    path: 'categories',
    children: [
      {
        path: '',
        component: CategoriesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'add',
        component: AddCategoryComponent,
        canActivate: [SecureInnerPagesGuard],
      },
      {
        path: 'edit',
        component: AddCategoryComponent,
        canActivate: [SecureInnerPagesGuard],
      },
    ],
  },
  {
    path: 'products',
    children: [
      { path: '', component: ProductsComponent, canActivate: [AuthGuard] },
      {
        path: 'add',
        component: AddProductComponent,
        canActivate: [SecureInnerPagesGuard, AuthGuard],
      },
      {
        path: 'edit',
        component: AddProductComponent,
        canActivate: [SecureInnerPagesGuard, AuthGuard],
      },
      {
        path: ':categoryName',
        component: ProductsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'orders',
    children: [
      { path: '', component: OrdersViewComponent, canActivate: [AuthGuard] },
      { path: 'add', component: OrderComponent, canActivate: [AuthGuard] },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, SecureInnerPagesGuard],
  },
  {
    path: 'authentication',
    children: [
      {
        path: 'log-in',
        component: LoginComponent,
        canActivate: [SecureInnerPagesGuard],
      },
      {
        path: 'registration',
        component: RegistrationComponent,
        canActivate: [SecureInnerPagesGuard],
      },
      {
        path: 'add-employee',
        component: RegistrationComponent,
        canActivate: [SecureInnerPagesGuard],
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [SecureInnerPagesGuard],
      },
      {
        path: 'verification',
        component: VerifyEmailComponent,
        canActivate: [SecureInnerPagesGuard],
      },
    ],
  },

  {
    path: 'profile',
    children: [
      { path: '', component: ProfileComponent, canActivate: [AuthGuard] },
      {
        path: 'edit',
        component: EditProfileComponent,
        canActivate: [AuthGuard],
      },
    ],
  },

  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
