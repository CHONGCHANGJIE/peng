import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  isLoading = true;
  username;
  transactions : any;

  constructor( private authService: AuthService,
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
