import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../services/transaction.service';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username;
  photoURL;
  isLoading = true;
  transactions : any;


  constructor(private authService: AuthService,
              private transactionService: TransactionService) { }

  ngOnInit() {
    this.isLoading = true;
  
    this.authService.user.subscribe(user => {
      if (user) {
        this.username = user.displayName;
        // this.photoURL = user.photoURL;
        setTimeout(() => {this.isLoading = false; } , 500);
        this.authService.loggedIn.next(true);
        return;
      }
      this.username = null;
      // this.photoURL = null;
      this.authService.loggedIn.next(false);


    });

    this.transactions = this.transactionService.getTransactionList();
  

}
}