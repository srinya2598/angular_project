import {Injectable} from '@angular/core';
import {DbService, RxCollections} from '@ec-core/services/database.service';
import {FetchMessage, FetchSuccess, SendMessage, SetSelectedRoomId, SetSelectedUserId} from '../../chat/actions/message';
import {Store} from '@ngrx/store';
import {getIsLoaded, getRooms, getSelectedRoomId, getSelectedUserId, State} from '../../chat/reducers';
import * as uuid from 'uuid/v4';
import {IMessage} from '@ec-shared/models/message';
import {take} from 'rxjs/operators';
import {Constants, MessageType} from '@ec-shared/utils/constants';
import {ApiService} from '@ec-core/services/api.service';
import {IRoom} from '@ec-shared/models/room';

@Injectable({
  providedIn: 'root'
})
export class ConversationalController {
  constructor(private dbService: DbService,
              private store: Store<State>,
              private apiService: ApiService) {
    this.setUpMessageChannel();
    this.fetchMessage();
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

  fetchMessage() {
    this.store.select(getIsLoaded).pipe(take(1)).subscribe(isLoaded => {
      if (!isLoaded) {
        this.dbService.getCollection(RxCollections.MESSAGES)
          .find()
          .$
          .subscribe((res1: IMessage[]) => {
            this.store.dispatch(new FetchMessage(res1));

          });
      }
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

  setUpMessageChannel() {
    const userId = this.apiService.getItem(Constants.USER_UID);
    if (!userId) {
      return;
    }
    this.apiService.getMessageStream(userId).subscribe((message: IMessage) => {
      // TODO: check if the room already exist... if not, first create the room and then store the message.
      if (message) {
        this.dbService.getCollection(RxCollections.MESSAGES).insert(message);
        this.store.dispatch(new SendMessage(message));
      }

    });
  }

  getRooms() {

    const member = this.apiService.getItem(Constants.USER_UID);
    this.apiService.getUserRooms(member).pipe(take(1)).subscribe((res: IRoom[]) => {
      if (res) {
        this.store.dispatch(new FetchSuccess(res));


      }

    });


  }
}
