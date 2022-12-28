import { CdkStepper } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/shared/interfaces/address';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [{ provide: CdkStepper, useExisting: RegistrationComponent }],
})
export class RegistrationComponent implements OnInit {
  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  hide = true;
  roles = ['manager', 'employee'];
  role: string | undefined;
  roleError = false;
  displayName: string | undefined;
  step = 0;
  userAddress: Address | undefined;
  isLogin: boolean | undefined;
  title: string = 'Register';

  registerForm = this.fb.group({
    tel: [
      '',
      [
        Validators.required,
        Validators.pattern('05[0|2|3|4|5|6|8]{1}-[0-9]{7}'),
        Validators.maxLength(11),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    fName: ['', [Validators.required]],
    lName: ['', [Validators.required]],
    role: [null, [Validators.required]],
    userId: ['', [Validators.required, Validators.pattern('^[0-9]{8,9}$')]],
  });

  addressForm = this.fb.group({
    city: ['', [Validators.required, Validators.pattern('^[a-z|A-Z ]*$')]],
    street: ['', [Validators.required, Validators.pattern('^[a-z|A-Z ]*$')]],
    house: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    zipCode: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
  });

  ngOnInit(): void {
    const url = this.router.url;
    if (url.endsWith('registration')) {
      this.isLogin = false;
      this.registerForm.get('role')?.disable();
    } else {
      this.registerForm.get('role')?.enable();
      this.title = 'add employee';
      this.isLogin = true;
    }
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  getErrorMessage(key: string) {
    if (this.registerForm.get(key)?.errors?.['email']) {
      return 'Enter a valid email address';
    }
    if (
      this.registerForm.get(key)?.errors?.['required'] ||
      this.addressForm.get(key)?.errors?.['required']
    ) {
      return 'You must enter a value';
    }
    if (
      this.registerForm.get(key)?.errors?.['pattern'] ||
      this.addressForm.get(key)?.errors?.['pattern']
    ) {
      if (key === 'tel') {
        return 'The phone number must be in the format 050-1234567';
      } else if (key === 'city' || key === 'street') {
        return `${key} can contain letters only`;
      } else if (key === 'house' || key === 'zipCode') {
        return `${
          key === 'house' ? 'house number' : key
        } can contain numbers only`;
      } else if (key === 'userId') {
        return 'ID can contain numbers only and must contain 9 digits';
      }
    }
    if (this.registerForm.get(key)?.errors?.['minLength']) {
      return 'Password must contain at least 6 characters';
    }
    if (this.registerForm.get(key)?.errors?.['maxLength']) {
      return 'Phone number need to be 10 digits and 1 dash only';
    }

    return null;
  }

  add() {
    this.displayName = `${this.registerForm.value.fName} ${this.registerForm.value.lName}`;
    this.userAddress = {
      city: this.addressForm.get('city')?.value,
      street: this.addressForm.get('street')?.value,
      houseNumber: this.addressForm.get('house')?.value,
      zipCode: this.addressForm.get('zipCode')?.value,
    };
    this.authService.SignUp(
      this.registerForm.value.email,
      this.registerForm.value.password,
      this.registerForm.value.fName,
      this.registerForm.value.lName,
      this.registerForm.value.tel,
      this.isLogin ? this.registerForm.value.role : 'user',
      this.registerForm.value.userId,
      this.userAddress,
      this.displayName
    );
  }
}
