import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  emailFormControl = new UntypedFormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  getErrorMessage() {
    if (this.emailFormControl.hasError('required')) {
      return 'You must enter your email address';
    }
    if (this.emailFormControl.hasError('email')) {
      return 'Enter a vaild email address';
    }
    return;
  }
  resetPassword() {
    this.authService.ForgotPassword(this.emailFormControl.value);
  }
}
