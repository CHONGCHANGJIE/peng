import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { auth } from 'firebase';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FlashMessagesService } from 'angular2-flash-messages';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from './toast.service';


@Injectable(
  //   {
  //   providedIn: 'root'
  // }
)
export class AuthService {
  loggedIn = new BehaviorSubject<boolean>(false);
  signedIn;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get currentUserObservable(): any {
    return this.af.user;
  }

  user: Observable<firebase.User>;
  authState: any;

  constructor(private af: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private toast: ToastService) {
      this.user = af.authState;
      this.af.authState.subscribe((auths) => {
        this.authState = auths;
      });
     }

  issignedIn() {
    // console.log(this.authState);
    return (this.authState !== undefined);
  }

  signup(email: string, password: string) {
    this.af
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  login(email: string, password: string) {
    this.af
      .auth.signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!', value);
        this.loggedIn.next(true);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        this.toast.sendMessage('Something went wrong:', 'danger', err.message);

      });
  }

  facebooklogin() {
    this.af
      .auth.signInWithPopup(new auth.FacebookAuthProvider())
      .then(value => {
        console.log('facebook login success!', value);
        this.loggedIn.next(true);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);

      });
  }

  googlelogin() {
    this.af
      .auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(value => {
        console.log('facebook login success!', value);
        this.loggedIn.next(true);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);

      });
  }

  logout() {
    this.af
      .auth.signOut().then(value => {
        this.loggedIn.next(false);
        console.log('Sign-out successful');

      }).catch(err => {
        console.log('An error happened.', err);
      });
    this.user.subscribe(user => {
      if (!user) {
        this.flashMessage.show('Logged-out.', { cssClass: 'alert-danger', timeout: 1500 });

      }
    });
  }

  resetPassword(email: string) {
    return this.af
      .auth
      .sendPasswordResetEmail(email)
      .then(() => console.log('email sent'))
      .catch((error) => console.log(error));
  }
}

