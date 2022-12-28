import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Address } from '../interfaces/address';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  USER_URL = 'http://localhost:5000/api/users';
  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private http: HttpClient,
    private userService: UserService
  ) {
    this.userData = this.afAuth.authState;
  }

  async SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result: any) => {
        this.ngZone.run(() => {
          this.userService.getSingleUser(result.user.uid).subscribe((data) => {
            const user = {
              uid: result.user.uid,
              displayName: result.user.displayName,
              role: data.role,
            };
            sessionStorage.setItem('user', JSON.stringify(user));
            JSON.parse(sessionStorage.getItem('user')!);
            this.SetUserData(result.user);
            this.router.navigate(['/']);
          });
        });

        return result;
      })
      .catch((error) => {
        const errorCode = error.code;
        if (
          errorCode === 'auth/invalid-email' ||
          errorCode === 'auth/wrong-password' ||
          errorCode === 'auth/user-not-found'
        ) {
          alert('Wrong email address or password.');
        } else {
          alert('Something went wrong please try again');
        }
      });
  }

  SignUp(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string,
    role: string,
    userID: string,
    address: Address,
    displayName: string
  ) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user?.updateProfile({
          displayName: displayName,
        });
        this.SetUserDataByEmailAndPassword(
          result.user,
          firstName,
          lastName,
          phone,
          role,
          userID,
          address
        ).subscribe((res) => {
          console.log(res);
        });
        if (role === 'user') {
          this.SendVerificationMail();
        } else {
          this.router.navigate(['/']);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        if (
          errorCode === 'auth/invalid-email' ||
          errorCode === 'auth/wrong-password' ||
          errorCode === 'auth/user-not-found'
        ) {
          alert('Wrong email address or password.');
        } else if (errorCode === 'auth/email-already-in-use') {
          alert('This email already in use');
        }
      });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((user) => {
        return user?.sendEmailVerification();
      })
      .then(() => {
        this.router.navigate(['authentication/verification']);
      });
  }

  SetUserDataByEmailAndPassword(
    user: any,
    first: string,
    last: string,
    phone: string,
    role: string,
    userID: string,
    address: any
  ): Observable<User> {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      _id: user.uid,
      userId: userID,
      email: user.email,
      firstName: first,
      lastName: last,
      phoneNumber: phone,
      role,
      address,
      emailVerified: role === 'user' ? user.emailVerified : true,
    };
    userRef.set(userData, {
      merge: true,
    });
    return this.http.post<User>(`${this.USER_URL}`, userData);
  }

  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(sessionStorage.getItem('user')!);
    return user !== null ? true : false;
  }

  getUser() {
    const user = JSON.parse(sessionStorage.getItem('user')!);
    return user;
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    userRef.update({
      uid: user.uid,
      email: user.email,
    });
  }

  updateEmail(newEmail: String) {
    this.afAuth.currentUser
      .then((user) => {
        user?.updateEmail(newEmail.toString());
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async SignOut() {
    return this.afAuth.signOut().then(() => {
      window.sessionStorage.removeItem('user');
      this.router.navigate(['/authentication/log-in']);
    });
  }
}
