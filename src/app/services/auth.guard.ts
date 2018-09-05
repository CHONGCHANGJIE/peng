import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isLoggedIn$: Observable<boolean>;
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.isLoggedIn.pipe(take(1), map((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.router.navigate(['']);
          return false;
        }    return true;

      }));
  }
    // canActivate() {
    //   this.isLoggedIn$ = this.authService.isLoggedIn;
    //   if (!this.isLoggedIn$) {
    //     this.router.navigate(['/login']);
    //     return false;
    //   } else {
    //     return true;
    //   }
    // }

}
