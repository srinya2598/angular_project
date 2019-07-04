import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {IUser} from '@ec-shared/models/users';
import {ApiService} from '@ec-core/services/api.service';
import {ConversationalController} from '@ec-core/controllers/conversational.controller';
import {IRoom} from '@ec-shared/models/room';
import {take} from 'rxjs/operators';
import {Constants} from '@ec-shared/utils/constants';
import {getRoomMessages, State} from '../../reducers';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {CommonUtils} from '@ec-shared/utils/common.utils';

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
  selectedUserId: string[];
  time: any;


  constructor(private apiService: ApiService,
              private conversationalController: ConversationalController,
              private store: Store<State>, private router: Router) {

  }

  ngOnInit() {
    this.selectedUserId = this.userRoom.participants;
    console.log(this.selectedUserId);
    const userId = this.apiService.getItem(Constants.USER_UID);
    this.selectedUserId = this.selectedUserId.filter(item => item !== userId);


    console.log(this.selectedUserId);

    this.apiService.getUserDetails(this.selectedUserId[0]).pipe(take(1)).subscribe((res: IUser) => {
      this.firstName = res.firstName;
      this.profileUrl = res.profileUrl;
    });

    this.store.select(state => getRoomMessages(state, this.userRoom.id)).subscribe((res) => {
        console.log(res);
        if(res.length>0) {
          const len = res.length;
          this.message = res[len - 1].text;
          this.time = new Date(res[len - 1 ].timestamp);
        }
      }
    );
  }

  visitChat() {
    this.conversationalController.setSelectedUserId(this.selectedUserId[0]);
    this.conversationalController.setSelectedRoomId(this.userRoom.id);
    this.router.navigate(['dashboard/chat', CommonUtils.getRoutePath(this.userRoom.id)]);
  }
}
