import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(public authService: AuthService,  private _router: Router) {
  }
  ngOnInit() {
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
