import { Component, OnInit, OnChanges } from '@angular/core';
import { FlashMessagesService} from 'angular2-flash-messages';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { DataService } from '../data.service';




@Component({
  selector: 'app-exchangeui',
  templateUrl: './exchangeui.component.html',
  styleUrls: ['./exchangeui.component.css']
})
export class ExchangeuiComponent implements OnInit {
  twdmyr: number;
  myr: number;
  twd: number;
  myrtwd: number ;

  form = new FormGroup({
    currencyselection: new FormControl('', [Validators.required]),
    exchangeamount: new FormControl('', [Validators.required]),
  });



  currencies = [
    {value: 'my-tw', viewValue: 'Taiwan NTD'},
    {value: 'tw-my', viewValue: 'Malaysia Ringgit'}
  ];
  constructor(private flashMessage: FlashMessagesService, private data: DataService) { }

  ngOnInit() {
    this.data.getUSDMYR().subscribe(
      res => {
      this.myr = res['quotes'].USDMYR; },

      );

      this.data.getUSDTWD().subscribe(
        res => {
        this.twd = res['quotes'].USDTWD; },

        );
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
