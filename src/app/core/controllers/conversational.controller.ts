import { Injectable } from '@angular/core';
import { DbService, RxCollections } from '@ec-core/services/database.service';
import { SendMessage, SetSelectedRoomId, SetSelectedUserId } from '../../chat/actions/message';
import { Store } from '@ngrx/store';
import { getSelectedRoomId, getSelectedUserId, State } from '../../chat/reducers';
import * as uuid from 'uuid/v4';
import { IMessage } from '@ec-shared/models/message';
import { take } from 'rxjs/operators';
import { Constants, MessageType } from '@ec-shared/utils/constants';
import { ApiService } from '@ec-core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ConversationalController {
  constructor(private dbService: DbService,
              private store: Store<State>,
              private apiService: ApiService) {
  }

  sendMessage(body: string) {
    let selectedUserId: string;
    let selectedRoomId: string;
    this.getSelectedUserId().pipe(take(1)).subscribe(id => selectedUserId = id);
    this.getSelectedRoomId().pipe(take(1)).subscribe(id => selectedRoomId = id);
    const message: IMessage = {
      id: uuid(),
      type: MessageType.TEXT,
      roomId: selectedRoomId,
      sender: this.apiService.getItem(Constants.USER_UID),
      receiver: selectedUserId,
      text: body || '',
      timestamp: new Date().getTime()
    };
    this.dbService.getCollection(RxCollections.MESSAGES).insert(message).then(() => {
      this.store.dispatch(new SendMessage(message));
    });
  }

  setSelectedUserId(userId: string) {
    if (!userId) {
      return;
    }
    this.store.dispatch(new SetSelectedUserId(userId));
  }

  setSelectedRoomId(roomId: string) {
    if (!roomId) {
      return;
    }
    this.store.dispatch(new SetSelectedRoomId(roomId));
  }


  getSelectedUserId() {
    return this.store.select(getSelectedUserId);
  }

  getSelectedRoomId() {
    return this.store.select(getSelectedRoomId);
  }
}
