import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isLoggedIn$: Observable<boolean>;
  constructor(private router: Router, private authService: AuthService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if ( this.authService.issignedIn()) {return true; }

    return this.authService.currentUserObservable.pipe(
            take(1)
            , map(user => !!user)
            , tap(loggedIn => {
             if (!loggedIn) {
               console.log('access denied');
               this.router.navigate(['/login']);
             }
         }));
    // return this.authService.isLoggedIn.pipe(take(1), map((isLoggedIn: boolean) => {
    //   if (isLoggedIn) {return true; }

    //     console.log('access denied!');
    //     this.router.navigate(['/login']);
    //     return false;

    // }));
  }

  // canActivate() {
  //   if (!this.authService.issignedIn()) {
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  //   return true;

  //   // if (!this.isLoggedIn$) {
  //   //   this.router.navigate(['/login']);
  //   //   return false;
  //   // } else {
  //   //   return true;
  //   // }
  // }

}
