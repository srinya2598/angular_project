import {Component, Input, OnInit} from '@angular/core';
import {IMessage} from '@ec-shared/models/message';
import {IUser} from '@ec-shared/models/users';
import {ApiService} from '@ec-core/services/api.service';
import {ConversationalController} from '@ec-core/controllers/conversational.controller';
import {IRoom} from '@ec-shared/models/room';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-chat-layout',
  templateUrl: './chat-layout.component.html',
  styleUrls: ['./chat-layout.component.scss']
})
export class ChatLayoutComponent implements OnInit {
  @ Input () selectedUser: IUser;
firstName: string;
profileUrl: string;

  constructor( private apiService: ApiService,
               private conversationalController: ConversationalController ) {
  }

  ngOnInit() {


    this.apiService.getUserDetails(this.selectedUser.id).pipe(take(1)).subscribe((res:IUser)=>{
     this.firstName  = res.firstName;
      this.profileUrl = res.profileUrl;
    });
}
