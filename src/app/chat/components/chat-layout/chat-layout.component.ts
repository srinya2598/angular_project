import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '@ec-shared/models/users';
import { ApiService } from '@ec-core/services/api.service';
import { ConversationalController } from '@ec-core/controllers/conversational.controller';
import { IRoom } from '@ec-shared/models/room';
import { take } from 'rxjs/operators';
import { Constants } from '@ec-shared/utils/constants';
import { Router } from '@angular/router';
import { CommonUtils } from '@ec-shared/utils/common.utils';
import { IMessage } from '@ec-shared/models/message';

@Component({
  selector: 'app-chat-layout',
  templateUrl: './chat-layout.component.html',
  styleUrls: ['./chat-layout.component.scss']
})
export class ChatLayoutComponent implements OnInit {
  @ Input() userRoom: IRoom;
  firstName: string;
  profileUrl: string;
  message: string;
  selectedUser: IUser;
  time: any;


  constructor(private apiService: ApiService,
              private conversationalController: ConversationalController,
              private router: Router) {

  }

  ngOnInit() {
    console.log(this.userRoom.participants);
    let participants: IUser[] = this.userRoom.participants;
    const userId = this.apiService.getItem(Constants.USER_UID);
    for (let iterator = 0; iterator < participants.length; iterator++) {
      if (participants[iterator].id !== userId) {
        this.selectedUser = participants[iterator];
        break;
      }
    }
    this.firstName = this.selectedUser.firstName;
    this.profileUrl = this.selectedUser.profileUrl;
    const lastMessage = this.conversationalController.fetchLastMessage(this.userRoom.id);
    this.message = lastMessage.text ;
    this.time = new Date(lastMessage.timestamp);
  }

  visitChat() {
    console.log(this.selectedUser);
    this.conversationalController.setSelectedUserId(this.selectedUser.id);
    this.conversationalController.setSelectedRoomId(this.userRoom.id);
    this.router.navigate(['dashboard/chat', CommonUtils.getRoutePath(this.userRoom.id)]);
  }
}
