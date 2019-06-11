import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {

  message: FormControl;
  showSendMessageButton = false;

  constructor() {
    this.message = new FormControl(null);
  }

  ngOnInit() {
    this.message.valueChanges.subscribe((value) => {
      if (value.length == 0) {
        this.showSendMessageButton = false;
        return;
      }
      this.showSendMessageButton = true;
    });
  }
}

