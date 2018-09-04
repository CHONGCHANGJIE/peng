import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username;
  photoURL;
  isLoading = true;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.authService.user.subscribe(user => {
      if (user) {
        this.username = user.displayName;
        this.photoURL = user.photoURL;
        this.isLoading = false;
        return;
      }
      this.username = null;
      this.photoURL = null;


    });
  }

}
