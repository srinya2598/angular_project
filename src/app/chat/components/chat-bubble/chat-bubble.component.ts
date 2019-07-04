import {Component, Input, OnInit} from '@angular/core';
import {IMessage} from '@ec-shared/models/message';
import {ApiService} from '@ec-core/services/api.service';
import {Constants} from '@ec-shared/utils/constants';
import {ConversationalController} from '@ec-core/controllers/conversational.controller';

@Component({
  selector: 'app-chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.scss']
})
export class ChatBubbleComponent implements OnInit {
  @Input() msg: IMessage;

  constructor(private apiService: ApiService,
              private conversationalController: ConversationalController) {
  }

  ngOnInit() {
  }

  senderMessage() {
    const user = this.apiService.getItem(Constants.USER_UID);
    return user === this.msg.sender;

  }
}
