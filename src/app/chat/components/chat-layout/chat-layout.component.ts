import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IUser} from '@ec-shared/models/users';
import {ApiService} from '@ec-core/services/api.service';
import {ConversationalController} from '@ec-core/controllers/conversational.controller';
import {IRoom} from '@ec-shared/models/room';
import {take} from 'rxjs/operators';
import {Constants} from '@ec-shared/utils/constants';
import {getRoomMessages, State} from '../../reducers';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-chat-layout',
  templateUrl: './chat-layout.component.html',
  styleUrls: ['./chat-layout.component.scss']
})
export class ChatLayoutComponent implements OnInit {
  @ Input() userRoom: IRoom;
  @ Input() firstName: string;
  @ Input() profileUrl: string;
  @ Input() message: string;
  @ Input() time: number;

  constructor(private apiService: ApiService,
              private conversationalController: ConversationalController,
              private store: Store<State>) {
  }

  ngOnInit() {
    let selectedUserId = this.userRoom.participants;
    console.log(selectedUserId);
    const userId = this.apiService.getItem(Constants.USER_UID);
    selectedUserId = selectedUserId.filter(item => item !== userId);


    console.log(selectedUserId);

    this.apiService.getUserDetails(selectedUserId[0]).pipe(take(1)).subscribe((res: IUser) => {
      this.firstName = res.firstName;
      this.profileUrl = res.profileUrl;
    });

    this.store.select( state => getRoomMessages(state, this.userRoom.id)).pipe(take(1)).subscribe( (res) => {
      console.log(res);
      const len = res.length;
      this.message = res[len-1].text;
      this.time = res[len-1].timestamp;
    }
    )
  }

}
