import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { UsernameValidators } from '../validators/username.validators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      UsernameValidators.cannotContainSpace
    ])
  });

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }



  constructor(public authService: AuthService,  private _router: Router) {
  }
  ngOnInit() {
  }

  emaillogin() {
    this.authService.login( this.form.value.email, this.form.value.password);
    this.authService.user.subscribe(user => {
      if (user) {
        this._router.navigate(['/profile']);
      }
    });
  }
  signup() {
    this.authService.signup(this.form.value.email, this.form.value.password);
    this.form.value.email = this.form.value.password = '';
    this.authService.user.subscribe(user => {
      if (user) {
        this._router.navigate(['/profile']);
      }
    });
  }
  login() {
    this.authService.facebooklogin();

    this.authService.user.subscribe(user => {
      if (user) {
        this._router.navigate(['/profile']);
      }
    });


  }

  glogin() {
    this.authService.googlelogin();
    this.authService.user.subscribe(user => {
      if (user) {
        this._router.navigate(['/profile']);
      }
    });

  }
}
