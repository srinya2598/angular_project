import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMessage } from '@ec-shared/models/message';
import { ApiService } from '@ec-core/services/api.service';
import { Constants, MessageType } from '@ec-shared/utils/constants';

@Component({
  selector: 'app-chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.scss']
})
export class ChatBubbleComponent implements OnInit {

  @Output() removeMessage: EventEmitter<IMessage>;
  @Output() forwardMessage: EventEmitter<string>;
  time: any;
  userId: string;
  _message: IMessage;
  MessageType = MessageType;

  @Input() set message(message: IMessage) {
    this._message = message;
  };

  get message() {
    return this._message;
  }

  constructor(private apiService: ApiService) {
    this.userId = this.apiService.getItem(Constants.USER_UID);
    this.removeMessage = new EventEmitter();
    this.forwardMessage = new EventEmitter();
  }


  ngOnInit() {
    console.log('Mera message', this.message);

    this.time = new Date(this.message.timestamp);
  }

  deleteMessage() {
    this.removeMessage.emit(this.message);
  }

  forward() {
    this.forwardMessage.emit(this.message.text);
  }
}
