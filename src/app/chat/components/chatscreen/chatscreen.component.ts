import {Component, OnInit} from '@angular/core';
import {ConversationalController} from '@ec-core/controllers/conversational.controller';
import {IRoom} from '@ec-shared/models/room';

import {ApiService} from '@ec-core/services/api.service';
import {take, takeWhile} from 'rxjs/operators';
import {Constants} from '@ec-shared/utils/constants';


class IUsers {
}

@Component({
  selector: 'app-chatscreen',
  templateUrl: './chatscreen.component.html',
  styleUrls: ['./chatscreen.component.scss']
})
export class ChatscreenComponent implements OnInit {
  selectedUsers: IUsers;
  


  constructor(private conversationalController: ConversationalController,
              private apiService: ApiService) {


  }

  ngOnInit() {

    this.conversationalController.fetchRooms();
    const userId = this.apiService.getItem(Constants.USER_UID);
    this.apiService.fetchUserRooms(userId).pipe(take(1)).subscribe((res: IUsers) => {
      console.log( res);

       this.selectedUsers = res  ;

    });

  }

}
