import {Injectable} from '@angular/core';
import {DbService, RxCollections} from '@ec-core/services/database.service';
import {SelectedRoom, SelectedUserId, SendMessage} from '../../chat/actions/message';
import {Store} from '@ngrx/store';
import {getSelectedRoomId, getSelectedUserId, State} from '../../chat/reducers';
import * as uuid from 'uuid/v4';
import {_getSelectedUserId} from '../../chat/reducers/conversation';
import {Constants} from '@ec-shared/utils/constants';
import {IMessage, ISender} from '@ec-shared/models/message';
import {message} from '../../chat/reducers/message';

@Injectable({
  providedIn: 'root'
})
export class ConversationalController {
  constructor(private dbService: DbService,
              private store: Store<State>) {
  }

  sendMessage(data: string) {
    let selectedUserId:string;
    this.getSelectedUserId().subscribe(id => selectedUserId = id);
    const message:IMessage = {
      id: uuid(),
      roomId: getSelectedRoomId,
      type: 'Test Message',
      timestamp: new Date().getTime(),
      text: data,
    };
    this.dbService.getCollection(RxCollections.MESSAGES).insert(message);
    this.store.dispatch(new SendMessage(message));
  }

  setSelectedUserId(userId: string){
    this.store.dispatch(new SelectedUserId(userId));
  }


  getSelectedUserId() {
    return this.store.select(getSelectedUserId);
  }

  getSelectedRoomId() {
    return this.store.select(getSelectedRoomId);
  }
}
