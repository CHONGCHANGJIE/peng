import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { auth } from 'firebase';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FlashMessagesService} from 'angular2-flash-messages';
import { BehaviorSubject } from 'rxjs';


@Injectable(
//   {
//   providedIn: 'root'
// }
)
export class AuthService {
  loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  user: Observable<firebase.User>;

  constructor(private af: AngularFireAuth,
              private db: AngularFireDatabase,
              private router: Router,
              private flashMessage: FlashMessagesService) { this.user = af.authState; }

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
      .then (value => {
        console.log('Nice, it worked!', value);
        this.loggedIn.next(true);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
    }

    facebooklogin() {
      this.af
      .auth.signInWithPopup(new auth.FacebookAuthProvider())
      .then( value => {
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
      .then( value => {
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
}

