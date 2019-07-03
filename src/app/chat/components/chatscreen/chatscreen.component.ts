import {Component, OnInit} from '@angular/core';
import { ConversationalController } from '@ec-core/controllers/conversational.controller';
import { IRoom } from '@ec-shared/models/room';
import { Store } from '@ngrx/store';
import { getRoomsList, State } from '../../reducers';


@Component({
  selector: 'app-chatscreen',
  templateUrl: './chatscreen.component.html',
  styleUrls: ['./chatscreen.component.scss']
})
export class ChatscreenComponent implements OnInit {
  userRooms: IRoom[];
  isLoading = true;

  constructor(private store: Store<State>,
              private conversationalController: ConversationalController) {
    this.conversationalController.fetchRooms();
  }

  ngOnInit() {

    this.store.select(getRoomsList).subscribe(res => {

      console.log(res);
      this.userRooms = res;
      this.isLoading = false;
    });
  }


}
