import { Injectable } from '@angular/core';
import { DbService, RxCollections } from '@ec-core/services/database.service';
import { CommonUtils } from '@ec-shared/utils/common.utils';
import { ApiService } from '@ec-core/services/api.service';
import { Constants } from '@ec-shared/utils/constants';
import { Store } from '@ngrx/store';
import { getIsLoaded, getSelectedUserId, State } from '../../chat/reducers';
import { IMessage } from '@ec-shared/models/message';
import { FetchMessage, SelectedUserId, SendMessage } from '../../chat/actions/message';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConversationalController {
  constructor(private dbService: DbService,
              private apiService: ApiService,
              private store: Store<State>) {
    this.fetchMessage();
    this.setUpMessageChannel();
  }

  sendMessage(message: string) {
    this.dbService.getCollection(RxCollections.MESSAGES).insert({
      id: CommonUtils.getRandomId(),
      roomId: 'abc',
      timestamp: new Date().getTime(),
      text: message,
      sender: this.apiService.getItem(Constants.USER_UID),
      receiver: 'qwerty',
    });


  }

  fetchMessage() {
    this.store.select(getIsLoaded).pipe(take(1)).subscribe(isLoaded => {
      if (!isLoaded) {
        this.dbService.getCollection(RxCollections.MESSAGES)
          .find()
          .$
          .subscribe((res: IMessage[]) => {
            this.store.dispatch(new FetchMessage(res));
          });
      }
    });
  }

  setSelectedUserId(userId: string) {
    this.store.dispatch(new SelectedUserId(userId));
  }


  getSelectedUserId() {
    return this.store.select(getSelectedUserId);
  }

  setUpMessageChannel() {
    const userId = this.apiService.getItem(Constants.USER_UID);
    if (!userId) {
      return;
    }
    this.apiService.getMessageStream(userId).subscribe((message: IMessage) => {
      // TODO: check if the room already exist... if not, first create the room and then store the message.
      this.dbService.getCollection(RxCollections.MESSAGES).insert(message);
      this.store.dispatch(new SendMessage(message));
    });
  }
}
