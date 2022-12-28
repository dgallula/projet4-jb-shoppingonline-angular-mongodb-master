import { Address } from 'src/app/shared/interfaces/address';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { User } from './../../../shared/models/user';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  userInfo: User | undefined;
  userAddress: Address | undefined;
  editMode = true;
  constructor(
    private fb: UntypedFormBuilder,
    private userSer: UserService,
    private router: Router,
    private notificaionService: NotificationService
  ) {}

  docId: string = '';
  firstName: string = '';
  lastName: string = '';
  phone: string = '';
  id: string = '';
  userCity: string = '';
  userStreet: string = '';
  userHouse: string = '';
  userZipCode: string = '';

  userForm = this.fb.group({
    tel: [
      '',
      [
        Validators.required,
        Validators.pattern('05[0|2|3|4|5|6|8]{1}-[0-9]{7}'),
        Validators.maxLength(11),
      ],
    ],
    fName: ['', [Validators.required]],
    lName: ['', [Validators.required]],
    userId: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(9)],
    ],
    city: ['', [Validators.required]],
    street: ['', [Validators.required]],
    house: ['', [Validators.required]],
    zipCode: ['', [Validators.required]],
  });

  ngOnInit(): void {
    try {
      this.docId = window.history.state.user._id;
      this.firstName = window.history.state.user.firstName;
      this.lastName = window.history.state.user.lastName;
      this.phone = window.history.state.user.phoneNumber;
      this.id = window.history.state.user.userId;
      this.userCity = window.history.state.user.address.city;
      this.userStreet = window.history.state.user.address.street;
      this.userHouse = window.history.state.user.address.houseNumber;
      this.userZipCode = window.history.state.user.address.zipCode;
    } catch (error) {
      this.router.navigate(['/profile']);
    }
  }

  getErrorMessage(key: string) {
    if (this.userForm.get(key)?.errors?.['required']) {
      return 'You must enter a value';
    }
    if (this.userForm.get(key)?.errors?.['pattern']) {
      return 'The phone number must be in the format 050-1234567';
    }

    if (this.userForm.get(key)?.errors?.['maxlength']) {
      if (key === 'tel') {
        return 'Phone number need to be 10 digits and 1 dash only';
      } else {
        return "ID number can't contain more then 9 digits";
      }
    }
    if (this.userForm.get(key)?.errors?.['minlength']) {
      return 'ID number must contain at least 8 digits';
    }
    return;
  }

  update() {
    this.userAddress = {
      city: this.userForm.value.city,
      street: this.userForm.value.street,
      houseNumber: this.userForm.value.house,
      zipCode: this.userForm.value.zipCode,
    };
    this.userInfo = {
      userId: this.userForm.value.userId,
      firstName: this.userForm.value.fName,
      lastName: this.userForm.value.lName,
      phoneNumber: this.userForm.value.tel,
      address: this.userAddress,
    };

    this.userSer.updateUser(this.userInfo, this.docId).subscribe((res) => {
      this.notificaionService.showSnackBar(
        'Your profile was updated successfully',
        'snackbar__info'
      );
      this.router.navigate(['/profile']);
    });
  }
}
