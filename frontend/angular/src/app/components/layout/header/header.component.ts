import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, NavigationStart } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  title: String | undefined;
  currentTime: number | undefined;

  constructor(private router: Router, private auth: AuthService) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.setCurrentTime();
      }
      event instanceof NavigationEnd && this.handleRouteChange();
    });
  }

  url = 'http://localhost:4200/';

  ngOnInit(): void {
    this.setCurrentTime();
    this.handleRouteChange();
  }

  setCurrentTime() {
    const date = new Date();
    this.currentTime = +date.toLocaleTimeString().substring(0, 2);
  }

  setTitle() {
    if (this.currentTime! >= 6 && this.currentTime! < 12) {
      this.title = 'Good morning ';
    } else if (this.currentTime! >= 12 && this.currentTime! < 16) {
      this.title = 'Good noon ';
    } else if (this.currentTime! >= 16 && this.currentTime! < 19) {
      this.title = 'Good afternoon ';
    } else if (this.currentTime! >= 19 && this.currentTime! < 22) {
      this.title = 'Good evening ';
    } else {
      this.title = 'Good night ';
    }
  }

  handleRouteChange = () => {
    this.setTitle();
    const url = this.router.url;
    const keys = this.router.url.split('/');
    if (this.router.url.endsWith('/')) {
      this.title += `${this.auth.getUser().displayName!}`;
    }
    if (url.endsWith('categories')) {
      this.title = 'Our categoies';
    }
    if (url.includes('categories')) {
      if (url.endsWith('edit')) {
        this.title = 'edit category';
      }
      if (url.endsWith('add')) {
        this.title = 'add category';
      }
    }
    if (url.includes('products')) {
      if (url.endsWith('edit')) {
        this.title = 'edit product';
      } else if (url.endsWith('add')) {
        this.title = 'add product';
      } else if (keys[2]) {
        this.title = `${keys[2].toString().replaceAll('&', ' and ')} list`;
      } else if (url.endsWith('')) {
        this.title = 'Search result';
      }
    }
    if (url.includes('profile')) {
      if (url.endsWith('edit')) {
        this.title = 'edit your profile';
      } else if (url.endsWith('')) {
        this.title = 'Your profile';
      }
    }
    if (url.includes('orders')) {
      if (url.endsWith('')) {
        if (this.auth.getUser().role === 'user') {
          this.title = 'Your Previous Orders';
        } else {
          this.title = 'All orders';
        }
      }
      if (url.endsWith('add')) {
        this.title = 'Place your order';
      }
    }

    if (url.includes('authentication')) {
      if (url.endsWith('add-employee')) {
        this.title = 'Add new employee';
      }
    }
    if (url.endsWith('dashboard')) {
      this.title = 'Summary';
    }
  };
}
