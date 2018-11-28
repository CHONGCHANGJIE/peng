import { Component, OnInit, OnChanges } from '@angular/core';
import { FlashMessagesService} from 'angular2-flash-messages';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { DataService } from '../data.service';
import { combineLatest } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Router} from '@angular/router';
import { TransactionService } from '../services/transaction.service';




@Component({
  selector: 'app-exchangeui',
  templateUrl: './exchangeui.component.html',
  styleUrls: ['./exchangeui.component.css']
})
export class ExchangeuiComponent implements OnInit {
  twdmyr: any;
  myr: number;
  twd: number;
  myrtwd: any ;
  checkId: string;
  exchangerate: number;


  form = new FormGroup({
    currencyselection: new FormControl('', [Validators.required]),
    exchangeamount: new FormControl('', [Validators.required]),
  });

  defaultcurrency: Object;
  defaultamount = 1000;

  currencyselections = [
    {value: 'my-tw', viewValue: 'Taiwan NTD'},
    {value: 'tw-my', viewValue: 'Malaysia Ringgit'}
  ];
  constructor(private flashMessage: FlashMessagesService,
              private data: DataService,
              private _router: Router,
              private authService: AuthService,
              private transactionService: TransactionService) {}


  ngOnInit() {

    // subscribe to combined observable get both MYR and TWD rate
     combineLatest([
      this.data.getUSDMYR(),
      this.data.getUSDTWD()
    ]).subscribe(combined => {
      this.myr = combined[0]['quotes'].USDMYR;
      this.twd = combined[1]['quotes'].USDTWD;
      this.myrtwd = this.myr / this.twd;
      this.twdmyr = this.twd / this .myr;
      console.log(this.myrtwd);
      console.log(this.twdmyr);

    });

    // direct subscribe to dataservice get MYR rate
    this.data.getUSDMYR().subscribe(
      res => {
      this.myr = res['quotes'].USDMYR;
      console.log(this.myr);
    },


    );
    // direct subscribe to dataservice get TWD rate
    this.data.getUSDTWD().subscribe(
        res => {
        this.twd = res['quotes'].USDTWD;
        console.log(this.twd);
      }
      );

    this.defaultcurrency = this.currencyselections[0];
    this.form.get('currencyselection').setValue(this.defaultcurrency);
    this.form.get('exchangeamount').setValue(this.defaultamount);
    
  }


  submit() {
    if (this.form.value.currencyselection.value=="my-tw") {
      this.exchangerate = this. myrtwd } else {
        this.exchangerate = this. twdmyr
      }
    const check = {
      currency: this.form.value.currencyselection.value,
      quantity: this.form.value.exchangeamount,
      status: "active",
      rate: this.exchangerate,
      payamount: this.exchangerate*this.form.value.exchangeamount,
      active: "true"
    };

    console.log(this.form);

    if (!this.form.valid) {
      console.log(this.form.valid);
      this.flashMessage.show('Please fill in all fields.', { cssClass: 'alert-danger', timeout: 1500 });
      this.flashMessage.grayOut(false);
      return false;
    }
    this.authService.user.subscribe(user => {
      if(user) { 
        console.log('true');
        this.checkId= this.transactionService.createTransaction(check);
        this._router.navigate(['/checks', this.checkId]);
    }
      else {console.log('Please log in ');
      this.flashMessage.show('Please sign in ... ', { cssClass: 'alert-danger', timeout: 2000 });
      this.flashMessage.grayOut(true);
      this._router.navigate(['/login']);
    }
      
    })
  }
}
