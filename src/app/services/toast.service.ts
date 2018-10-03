import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Message } from '../item/class/message/message';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private db: AngularFireDatabase) { }

  getMessages() {
    return this.db.list('/messages',  ref => ref.limitToLast(2).orderByKey())
    .snapshotChanges()
    .pipe(map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val() } ))));
  }


  sendMessage(content, style, error) {
    const message = new Message(content, style, error);
    this.db.list('/messages').push(message);
  }

  dismissMessage(messageKey) {
    this.db.object(`messages/${messageKey}`).update({'dismissed': true});
  }

}
