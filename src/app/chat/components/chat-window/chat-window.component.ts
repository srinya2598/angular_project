import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ConversationalController} from '@ec-core/controllers/conversational.controller';
import {IUser} from '@ec-shared/models/users';
import {take} from 'rxjs/operators';
import {ApiService} from '@ec-core/services/api.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {
  @Input() selectedUser: IUser;
  message: FormControl;
  showSendMessageButton = false;
  firstName: string;
  lastName: string;
  profileUrl: string;


  constructor(private conversationalController: ConversationalController) {
    this.message = new FormControl(null);

    this.conversationalController.getSelectedUserId().pipe(take(1)).subscribe(id => {


      this.apiService.getUserDetails(id).pipe(take(1)).subscribe((res: IUser) => {
        console.log(res);

        this.firstName = res.firstName;
        this.lastName = res.lastName;
        this.profileUrl = res.profileUrl;


      });

    });


  }

  ngOnInit() {
    this.message.valueChanges.subscribe((value) => {
      if (value.length === 0) {
        this.showSendMessageButton = false;
        return;
      }
      this.showSendMessageButton = true;
    });
  }

  sendMessage() {
    this.conversationalController.sendMessage(this.message.value);
    console.log('01');
  }
}

