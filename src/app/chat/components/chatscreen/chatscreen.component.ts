import {Component, OnDestroy, OnInit} from '@angular/core';
import { ConversationalController } from '@ec-core/controllers/conversational.controller';
import { IRoom } from '@ec-shared/models/room';

import { Store } from '@ngrx/store';
import { getRoomsList, State } from '../../reducers';
import {AuthController} from '@ec-core/controllers/auth-controller';
import {takeWhile} from 'rxjs/operators';


@Component({
  selector: 'app-chatscreen',
  templateUrl: './chatscreen.component.html',
  styleUrls: ['./chatscreen.component.scss']
})
export class ChatscreenComponent implements OnInit, OnDestroy {
  userRooms: IRoom[];
  isLoading = false;
  isAlive = true;


  constructor(private store: Store<State>,
              private conversationalController: ConversationalController,
              private authController: AuthController) {
    this.conversationalController.fetchRooms();
    this.authController.getIsLoading().pipe(takeWhile(() => this.isAlive)).subscribe(isLoading => this.isLoading = isLoading);
  }

  ngOnInit() {

    this.store.select(getRoomsList).subscribe(res => {

      console.log(res);
      this.userRooms = res;

    });

  }
  ngOnDestroy(): void {
    this.isAlive = false;
  }

}
