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
  time: any;
  userId: string;

  constructor(private apiService: ApiService,
              private conversationalController: ConversationalController) {
     this.userId = this.apiService.getItem(Constants.USER_UID);


  }


  ngOnInit() {
    this.time = new Date(this.msg.timestamp);
  }

  removeMessage() {
    this.conversationalController.removeMessage(this.msg);
  }
}
