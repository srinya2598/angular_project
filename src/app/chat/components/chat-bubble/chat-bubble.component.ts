import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMessage } from '@ec-shared/models/message';

@Component({
  selector: 'app-chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.scss']
})
export class ChatBubbleComponent implements OnInit {
  @Input() message: IMessage;
  @Output() removeMessage: EventEmitter<IMessage>;
  time: any;

  constructor() {
    this.removeMessage = new EventEmitter();

  }


  ngOnInit() {
    this.time = new Date(this.message.timestamp);
  }

  deleteMessage() {
    this.removeMessage.emit(this.message);
  }
}
