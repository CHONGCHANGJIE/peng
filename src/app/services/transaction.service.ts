import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  userId: string;

 constructor( private db: AngularFireDatabase, 
              private afAuth: AngularFireAuth) { 
    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    })
  
  }

  getTransactionList(){
    if(!this.userId) return;
    return this.db.list(`transactions/${this.userId}`, ref => ref.limitToLast(5).orderByKey())
    .snapshotChanges()
    .pipe(map(changes => changes.map(c=> ({key:c.payload.key, ...c.payload.val()}))));
  }

  getTransaction(id){
    console.log(this.userId);
    console.log(id);
    console.log(`transactions/${this.userId}/${id}`);
    // this.db.object(`transactions/${this.userId}/${id}`).valueChanges().subscribe( id => { 
    //   if(id) { 
    //     console.log("id found");
    //   }else{
    //     console.log("id not found");
    //   }
    // });
    return this.db.object(`transactions/${this.userId}/${id}`).snapshotChanges().pipe(map(action =>{
      const $key =action.payload.key;
      const data = {$key , ...action.payload.val()};
      return data;
    }))
  }
  // getTransactionObject(){
  //   if(!this.userId) return;
  //   this.transactions = this.db.object(`transactions/${this.userId}`).snapshotChanges()
  //   .pipe(map(action=> {
  //     const $key = action.payload.key;
  //     const data = { $key, ...action.payload.val()};
  //     return data;
  //   }))
  //   return this.transactions;

  createTransaction(transaction) {
   return this.db.list(`transactions/${this.userId}`).push(transaction).key;
  }


  deleteTransaction(transactionKey) {
    this.db.object(`transactions/${this.userId}/${transactionKey}`).update({"active": false});
  }

  cancelTransaction(transactionKey) {
    this.db.object(`transactions/${this.userId}/${transactionKey}`).update({"status": "cancelled"});
  }
  
  }



