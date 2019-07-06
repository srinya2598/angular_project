import {Component, Input, OnInit} from '@angular/core';
import {IUser} from '@ec-shared/models/users';
import {ApiService} from '@ec-core/services/api.service';
import {ConversationalController} from '@ec-core/controllers/conversational.controller';
import {IRoom} from '@ec-shared/models/room';
import {take} from 'rxjs/operators';
import {Constants} from '@ec-shared/utils/constants';
import {Router} from '@angular/router';
import {CommonUtils} from '@ec-shared/utils/common.utils';
import {IMessage} from '@ec-shared/models/message';

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
  selectedUserId: string;
  time: any;


  constructor(private apiService: ApiService,
              private conversationalController: ConversationalController,
              private router: Router) {

  }

  ngOnInit() {
    let participants: IUser[] = this.userRoom.participants;
    const userId = this.apiService.getItem(Constants.USER_UID);
    this.selectedUser = participants.filter(item => item !== userId)[0];
    this.apiService.getUserDetails(this.selectedUserId).pipe(take(1)).subscribe((res: IUser) => {
      this.firstName = res.firstName;
      this.profileUrl = res.profileUrl;
    });

    const lastMessage = this.conversationalController.fetchLastMessage(this.userRoom.id);
    console.log(typeof lastMessage, lastMessage, 'last message');
    this.message = lastMessage[0];
    this.time = lastMessage[1];


  }

  visitChat() {
    this.conversationalController.setSelectedUserId(this.selectedUserId);
    this.conversationalController.setSelectedRoomId(this.userRoom.id);
    this.router.navigate(['dashboard/chat', CommonUtils.getRoutePath(this.userRoom.id)]);
  }
}
