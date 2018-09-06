import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { UsernameValidators } from '../validators/username.validators';
import { ToastService } from '../services/toast.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  passReset = false;
  breakpoint: number;
  mailloading = false;



  form = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      UsernameValidators.cannotContainSpace
    ])
  });

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }



  constructor(public authService: AuthService,  private _router: Router, private toast: ToastService
  ) {
  }
  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 1000) ? 1 : 2;
    console.log(this.form);

  }
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 1000) ? 1 : 2;

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
    if (this.form.valid) {
    this.authService.signup(this.form.value.email, this.form.value.password);
    this.form.value.email = this.form.value.password = '';
    this.authService.user.subscribe(user => {
      if (user) {
        this._router.navigate(['/profile']);
      }
    });
    return;
   } console.log('make sure all field is valid');
      this.toast.sendMessage('Make sure all field is valid', 'info', 'make sure all field is valid');
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

  resetPassword() {
    this.mailloading = true;
    this.authService.resetPassword(this.form.value.email)
    .then(() => {
      this.passReset = true;
      this.mailloading = false; });
  }
}
