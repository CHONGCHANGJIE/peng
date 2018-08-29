import { Component, OnInit, OnChanges } from '@angular/core';
import { FlashMessagesService} from 'angular2-flash-messages';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { DataService } from '../data.service';
import {combineLatest } from 'rxjs';




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
              private data: DataService) {}


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

    const check = {
      currencyselection: this.form.value.currencyselection,
      exchangeamount: this.form.value.exchangeamount,
    };

    console.log(this.form);

    if (!this.form.valid) {
      console.log(this.form.valid);
      this.flashMessage.show('Please fill in all fields.', { cssClass: 'alert-danger', timeout: 1500 });
      this.flashMessage.grayOut(false);
      return false;
    }
  }
}
