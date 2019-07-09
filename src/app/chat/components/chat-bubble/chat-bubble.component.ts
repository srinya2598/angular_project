import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMessage } from '@ec-shared/models/message';
import { ApiService } from '@ec-core/services/api.service';
import { Constants } from '@ec-shared/utils/constants';

@Component({
  selector: 'app-chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.scss']
})
export class ChatBubbleComponent implements OnInit {
  @Input() message: IMessage;
  @Output() removeMessage: EventEmitter<IMessage>;
  userId: string;
  time: any;

  constructor(private apiService: ApiService) {
    this.removeMessage = new EventEmitter();
    this.userId = this.apiService.getItem(Constants.USER_UID);
  }


  ngOnInit() {
    this.time = new Date(this.message.timestamp);
  }

  deleteMessage() {
    this.removeMessage.emit(this.message);
  }
}
