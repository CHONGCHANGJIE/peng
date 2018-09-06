import { ObservableCreator } from './observablecreator';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _mockDatatwd: any = {
    'success': true, 'terms': 'https:\/\/currencylayer.com\/terms',
    'privacy': 'https:\/\/currencylayer.com\/privacy',
    'timestamp': 1536212647, 'source': 'USD', 'quotes': { 'USDTWD': 30.806502 }
  };

  private _mockDatamyr: any = {
    'success': true, 'terms': 'https:\/\/currencylayer.com\/terms',
    'privacy': 'https:\/\/currencylayer.com\/privacy',
    'timestamp': 1536212647, 'source': 'USD', 'quotes': { 'USDMYR': 4.1475 }
  };


  constructor(private http: HttpClient) { }

  getUSDTWD() {
    // return this.http.get('http://www.apilayer.net/api/live?access_key=2a7d5b8a237bf1bfd099fe2663d57a07&currencies=TWD')
    //   .pipe(map(res => res));
    return ObservableCreator.createFromData(this._mockDatatwd);



  }
  getUSDMYR() {
    // return this.http.get('http://www.apilayer.net/api/live?access_key=2a7d5b8a237bf1bfd099fe2663d57a07&currencies=MYR')
    //   .pipe(map(res => res));
    return ObservableCreator.createFromData(this._mockDatamyr);
  }

}
