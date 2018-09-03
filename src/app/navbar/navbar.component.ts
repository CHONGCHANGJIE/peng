import { LoginComponent } from './../login/login.component';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoading = true;
  username;

  constructor(private flashMessage: FlashMessagesService, private lg: LoginComponent){}

  ngOnInit() {
    this.isLoading = true;

    this.lg.af.user.subscribe(user => {
      if (user) {
        this.username = user.displayName;
        this.isLoading = false;
        return;
      }
        this.username = null;

        this.isLoading = false;
    });
  }

  logout() {
    this.lg.af.auth.signOut().then(function() {
      console.log('Sign-out successful');
    }).catch(function(error) {
      console.log('An error happened.');

    });
    this.flashMessage.show('Logged-out.', { cssClass: 'alert-danger', timeout: 1500 });

  }
}
