import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './components/layout/header/header.component';
import { NavBarComponent } from './components/layout/nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesComponent } from './components/categories/categories/categories.component';
import { AddCategoryComponent } from './components/categories/add-category/add-category.component';
import { ProductsComponent } from './components/products-components/products/products.component';
import { AddProductComponent } from './components/products-components/add-product/add-product.component';
import { CartComponent } from './components/cart-components/cart/cart.component';
import { CartProductsComponent } from './components/cart-components/cart-products/cart-products.component';
import { ProductCardComponent } from './components/products-components/product-card/product-card.component';
import { OrderComponent } from './components/orders-components/order/order.component';
import { OrderItemComponent } from './components/orders-components/order-item/order-item.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CreditCardDirective } from './shared/directives/credit-card.directive';
import { ExpirationDateDirective } from './shared/directives/expiration-date.directive';
import { PhoneNumberDirective } from './shared/directives/phone-number.directive';
import {
  OrderDetailsDialog,
  OrdersViewComponent,
} from './components/orders-components/orders-view/orders-view.component';
import { LoginComponent } from './components/auth-components/login/login.component';
import { RegistrationComponent } from './components/auth-components/registration/registration.component';
import { ForgotPasswordComponent } from './components/auth-components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/auth-components/verify-email/verify-email.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { AuthService } from './shared/services/auth.service';
import { ProfileComponent } from './components/user-components/profile/profile.component';
import { EditProfileComponent } from './components/user-components/edit-profile/edit-profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import {
  RECAPTCHA_SETTINGS,
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaSettings,
} from 'ng-recaptcha';
import { NgChartsModule } from 'ng2-charts';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsChartComponent } from './components/charts/products-chart/products-chart.component';
import { UsersOrdersChartComponent } from './components/charts/users-orders-chart/users-orders-chart.component';
import { OrdersChartComponent } from './components/charts/orders-chart/orders-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavBarComponent,
    CategoriesComponent,
    AddCategoryComponent,
    ProductsComponent,
    AddProductComponent,
    CartComponent,
    CartProductsComponent,
    ProductCardComponent,
    OrderComponent,
    OrderItemComponent,
    CreditCardDirective,
    ExpirationDateDirective,
    PhoneNumberDirective,
    OrdersViewComponent,
    OrderDetailsDialog,
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    ProfileComponent,
    EditProfileComponent,
    NotFoundComponent,
    HomeComponent,
    DashboardComponent,
    ProductsChartComponent,
    UsersOrdersChartComponent,
    OrdersChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    FileUploadModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    NgChartsModule,
  ],
  providers: [AuthService, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
