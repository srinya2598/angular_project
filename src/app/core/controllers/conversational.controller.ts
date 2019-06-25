import {Injectable} from '@angular/core';
import {DbService, RxCollections} from '@ec-core/services/database.service';
import {SelectedUserId} from '../../chat/actions/message';
import {Store} from '@ngrx/store';
import {getSelectedUserId, State} from '../../chat/reducers';
import * as uuid from 'uuid/v4';
import {_getSelectedUserId} from '../../chat/reducers/conversation';
import {Constants} from '@ec-shared/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class ConversationalController {
  constructor(private dbService: DbService,
              private store: Store<State>) {
  }

  sendMessage(message: string) {
    this.dbService.getCollection(RxCollections.MESSAGES).insert({
      id:"12345vjndkjg232",
      roomid:"iasdga",
      type:"text",
      timestamp:new Date().getTime(),
      text:"zhjsdbugbaskf",
      sender:"dskjfhua",
      receiver:"SBjhk",
    });
  }

  setSelectedUserId(userId: string){
    this.store.dispatch(new SelectedUserId(userId));
  }


  getSelectedUserId() {
    return this.store.select(getSelectedUserId);
  }
}
