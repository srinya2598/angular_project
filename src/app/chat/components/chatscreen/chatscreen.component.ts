import { Component, OnInit } from '@angular/core';
import {ConversationalController} from '@ec-core/controllers/conversational.controller';
import {IRoom} from '@ec-shared/models/room';
import {take} from 'rxjs/operators';
import {ApiService} from '@ec-core/services/api.service';
import {Constants} from '@ec-shared/utils/constants';

@Component({
  selector: 'app-chatscreen',
  templateUrl: './chatscreen.component.html',
  styleUrls: ['./chatscreen.component.scss']
})
export class ChatscreenComponent implements OnInit {
  chats: IRoom[];

  constructor(private conversationalController : ConversationalController,
              private apiService: ApiService) {
    this.conversationalController.fetchRooms();

  }

  ngOnInit() {
    this.conversationalController.fetchRooms();
    const yoo = 'heya';
    console.log(yoo);
  }

}
