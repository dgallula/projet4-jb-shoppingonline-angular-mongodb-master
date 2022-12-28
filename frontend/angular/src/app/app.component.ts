import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Shooping app';

  url = false;
  constructor(private router: Router, location: Location) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (
          event.url === '/not-found' ||
          location.path().endsWith('not-found')
        ) {
          this.url = false;
        } else {
          this.url = true;
        }
      }
    });
  }
}
