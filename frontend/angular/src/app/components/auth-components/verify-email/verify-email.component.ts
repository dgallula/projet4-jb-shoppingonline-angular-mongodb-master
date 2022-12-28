import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent implements OnInit {
  userData: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.userData = JSON.parse(sessionStorage.getItem('user')!);
    this.authService.userData.subscribe((data: any) => {
      this.userData = data;
    });
  }

  navigateToLogin() {
    this.router.navigateByUrl('/authentication/log-in', {
      state: { email: this.userData.email },
    });
  }

  SendMail() {
    this.authService.SendVerificationMail();
  }
}
