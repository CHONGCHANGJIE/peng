import { Component, OnInit , OnDestroy} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { UsernameValidators } from '../validators/username.validators';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TransactionService } from '../services/transaction.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'; 

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
  check: object;

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

  constructor( private afStorage: AngularFireStorage, private transactionService: TransactionService,
                private route: ActivatedRoute) { }

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

    
   this.route.params.subscribe(params => {
       this.transactionService.getTransaction(params['checkId']).subscribe(item=> {console.log(item);  this.check = item});
    });
    this.check = this.transactionService.getTransaction("-LSJ59QQJ1znL16tFuLA")
    console.log(this.check)
  }

  ngOnDestroy () {
  }
}
