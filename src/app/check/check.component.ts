import { Component, OnInit , OnDestroy} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { UsernameValidators } from '../validators/username.validators';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TransactionService } from '../services/transaction.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


import { HttpClient} from '@angular/common/http';
import { switchMap} from 'rxjs/operators';



@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  uploadState: Observable<string>;
  checkStatus: any;
  check: any;
  checkId: any;
  _check: any;
  endpoint = 'https://us-central1-teepeng-9cada.cloudfunctions.net/httpEmail';


  form = new FormGroup({
    account: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      UsernameValidators.cannotContainSpace
    ])
  });
  get account() {
    return this.form.get('account');
  }

  constructor(private afStorage: AngularFireStorage, 
              private transactionService: TransactionService,
              private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient) { }

  upload(event){

    // create a random id
  const randomId = Math.random().toString(36).substring(2);

  // create a reference to the storage bucket location
    this.ref = this.afStorage.ref(randomId);
  // the put method creates an AngularFireUploadTask
  // and kicks off the upload
    this.task = this.ref.put(event.target.files[0]);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    // this.uploadProgress = this.task.snapshotChanges()
    // .pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = this.ref.getDownloadURL())).subscribe();
  }
  ngOnInit() {
    

    // this.route.params.subscribe(params => {
    //    this.transactionService.getTransaction(params['checkId']).subscribe(item=> {console.log(item);  this.check = item});
    // });

    this.route.params.subscribe(params=> {this.checkId = params});
    console.log(this.checkId);
    this.check = this.transactionService.getTransaction(this.checkId.checkId);
    this.check.subscribe(item=>{ if(!item.active){console.log('item not found'); this.cancel();}else {this._check = item; console.log(item)}});
       
  }

  ngOnDestroy () {
    
    console.log(this._check.$key);
    this.transactionService.deleteTransaction(this._check.$key);
  }

  checkout() {
    console.log('hello world');
   
  }

  cancel() {
    console.log('trade cancelled');
    this.transactionService.cancelTransaction(this._check.$key);
    this.router.navigate(['/'])
  }
}
