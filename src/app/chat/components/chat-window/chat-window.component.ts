import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {ConversationalController} from '@ec-core/controllers/conversational.controller';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {

  message: FormControl;
  showSendMessageButton = false;

  constructor(private conversationalController: ConversationalController) {
    this.message = new FormControl(null);
  }

  ngOnInit() {
    this.message.valueChanges.subscribe((value) => {
      if (value.length === 0) {
        this.showSendMessageButton = false;
        return;
      }
      this.showSendMessageButton = true;
    });
  }

  sendMessage() {
    this.conversationalController.sendMessage(this.message.value);
    console.log('01');
  }
}

