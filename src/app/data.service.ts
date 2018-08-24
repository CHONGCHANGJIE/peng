import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  getUSDTWD() {
    return this.http.get('http://www.apilayer.net/api/live?access_key=2a7d5b8a237bf1bfd099fe2663d57a07&currencies=TWD')
    .pipe(map(res => res));
  }
  getUSDMYR() {
    return this.http.get('http://www.apilayer.net/api/live?access_key=2a7d5b8a237bf1bfd099fe2663d57a07&currencies=MYR')
    .pipe(map(res => res));
  }

}
