import { Injectable } from '@angular/core';
import { DbService, RxCollections } from '@ec-core/services/database.service';
import * as uuid from 'uuid/v4';
import {SelectedUserId} from '../../chat/actions/message';
import {Store} from '@ngrx/store';
import {getSelectedUserId, State} from '../../chat/reducers';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConversationalController {
  constructor(private dbService: DbService,
              private store: Store<State>) {
  }

  sendMessage(message: string) {
    // this.dbService.getCollection(RxCollections.MESSAGES).insert({
    //   id: '12345vjndkjg232',
    //   roomId: 'iasdga',
    //   timestamp: new Date().getTime(),
    //   text: 'zhjsbugbaskf',
    //   sender: 'dskjfhua',
    //   receiver: 'SBjhk',
    // });
    this.dbService.getCollection(RxCollections.MESSAGES).find().where('roomId').eq('iasdga').$.subscribe(r => console.log(r));

  }

  setSelectedUserId(userId: string){
    this.store.dispatch(new SelectedUserId(userId));
  }


  getSelectedUserId() {
    return this.store.select(getSelectedUserId);
  }
}
