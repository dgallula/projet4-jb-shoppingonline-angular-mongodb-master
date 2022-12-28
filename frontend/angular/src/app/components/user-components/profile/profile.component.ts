import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  docId: string = '';
  user: User | undefined;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.docId = JSON.parse(sessionStorage.getItem('user')!).uid;
    this.userService.getSingleUser(this.docId).subscribe((data) => {
      this.user = data;
    });
  }

  edit() {
    this.router.navigateByUrl('/profile/edit', {
      state: {
        user: this.user,
      },
    });
  }
}
