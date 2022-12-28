import {
  Component,
  OnInit,
  VERSION,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Validators, UntypedFormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RecaptchaComponent, RecaptchaErrorParameters } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  version = VERSION.full;
  lang = 'en';

  @ViewChild('captchaElem') captchaElem: RecaptchaComponent | any;
  @ViewChild('langInput') langInput: ElementRef | any;
  recComp: RecaptchaComponent | any;
  token: string | undefined;
  // siteKey = environment.recaptcha.siteKey;
  // tokenError = false;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    recaptcha: ['', Validators.required],
  });

  constructor(
    private authService: AuthService,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {}

  getErrorMessage(key: string) {
    if (this.loginForm.get(key)?.errors?.['required']) {
      return `You must enter your ${key} address`;
    }
    if (this.loginForm.get(key)?.errors?.['email']) {
      return 'Enter a vaild email address';
    }
    if (this.loginForm.get(key)?.errors?.['minLength']) {
      return 'Password must contain at least 6 characters';
    }

    return;
  }

  // public getToken(captchaResponse: string): void {
  //   this.token = captchaResponse;
  //   this.tokenError = false;
  //   console.log(`Resolved captcha with response:`, captchaResponse);
  // }

  // public onError(errorDetails: RecaptchaErrorParameters): void {
  //   console.log(`Recaptcha error encountered; details:`, errorDetails);
  // }

  signIn() {
    // if (!this.token) {
    //   this.tokenError = true;
    //   return;
    // }
    this.authService.SignIn(
      this.loginForm.value.email,
      this.loginForm.value.password
    );
  }
}
