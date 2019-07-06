import {Component, OnInit} from '@angular/core';
import {ConversationalController} from '@ec-core/controllers/conversational.controller';
import {IRoom} from '@ec-shared/models/room';


@Component({
  selector: 'app-chatscreen',
  templateUrl: './chatscreen.component.html',
  styleUrls: ['./chatscreen.component.scss']
})
export class ChatscreenComponent implements OnInit {
  userRooms: IRoom[];
  isLoaded: boolean;

  constructor(private conversationalController: ConversationalController) {
    this.conversationalController.fetchRooms();

  }

  ngOnInit() {
    this.conversationalController.getIsLoaded().subscribe(res1 => this.isLoaded = res1);
    this.conversationalController.getRoomLists().subscribe(res => {
        this.userRooms = res;
      }
    );
  }


}
