import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoading = true;
  isLoggedIn$: Observable<boolean>;

  constructor(  private authService: AuthService, private _router: Router) {}

  ngOnInit() {

    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.authService.user.subscribe(user => {
      if (user) {
        this.authService.loggedIn.next(true);
        return;
      }

    });
  }

  logout() {
    this.authService.logout();
    this.authService.user.subscribe(user => {
      if (!user) {
        this._router.navigate(['']);
      }
    });

  }
}
