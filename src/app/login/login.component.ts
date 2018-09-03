import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

displayName;
photoURL;


  constructor(public af: AngularFireAuth, private _router: Router) {
  }
  ngOnInit() {

    this.af.auth.onAuthStateChanged(function (authState) {
      if (authState) {
        console.log('User is signed in.', authState);
        return;

      } else {
        console.log('User not logged in.');
      }

    });
    this.af.user.subscribe(user => {
      if (user) {
      this.displayName = user.displayName;
      this.photoURL = user.photoURL;
      return;
      }
      this.displayName = null;
      this.photoURL = null;
    });
  }


  login() {
    this.af.auth.signInWithPopup(new auth.FacebookAuthProvider());
    this._router.navigate(['/profile']);

  }

  glogin() {
    this.af.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this._router.navigate(['/profile']);

  }
}
