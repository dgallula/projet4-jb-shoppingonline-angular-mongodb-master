import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  config: MatSnackBarConfig = {
    duration: 5000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
  };

  constructor(public snackBar: MatSnackBar) {}

  showSnackBar(msg: String, className: String) {
    this.config['panelClass'] = [`${className}`];
    this.snackBar.open(`${msg}`, undefined, this.config);
  }
}
