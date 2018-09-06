import { Component, OnInit } from '@angular/core';
import { ToastService } from '../services/toast.service';


@Component({
  selector: 'app-toast-message',
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.css']
})
export class ToastMessageComponent implements OnInit {

  messages: any;

  constructor(private toast: ToastService) { }

  ngOnInit() {
    this.messages = this.toast.getMessages();
  }

  dismiss(itemKey) {
    this.toast.dismissMessage(itemKey);
  }
}
