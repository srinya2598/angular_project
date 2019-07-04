import {Component, OnInit} from '@angular/core';
import {ConversationalController} from '@ec-core/controllers/conversational.controller';
import {IRoom} from '@ec-shared/models/room';
import {Store} from '@ngrx/store';
import {getRoomsList, State} from '../../reducers';
import {ApiService} from '@ec-core/services/api.service';
import {Constants} from '@ec-shared/utils/constants';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {IUser} from '@ec-shared/models/users';
import {CommonUtils} from '@ec-shared/utils/common.utils';


@Component({
  selector: 'app-chatscreen',
  templateUrl: './chatscreen.component.html',
  styleUrls: ['./chatscreen.component.scss']
})
export class ChatscreenComponent implements OnInit {
  userRooms: IRoom[];
  isLoading = true;

  constructor(private store: Store<State>,
              private conversationalController: ConversationalController,
              private apiService: ApiService, private router: Router) {
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
