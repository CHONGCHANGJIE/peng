import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username;
  photoURL;
  isLoading = true;

  constructor(private lg: LoginComponent) { }

  ngOnInit() {

    this.lg.af.user.subscribe(user => {
      if (user) {
        this.username = user.displayName;
        this.photoURL = user.photoURL;
        this.isLoading = false;
        return;
      }
      this.username = null;
      this.photoURL = null;
      this.isLoading = false;
    });
  }

}
