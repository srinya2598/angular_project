import { Injectable } from '@angular/core';
import { DbService, RxCollections } from '@ec-core/services/database.service';
import { FetchMessage, FetchRoomSuccess, SendMessage, SetSelectedRoomId, SetSelectedUserId } from '../../chat/actions/message';
import { Store } from '@ngrx/store';
import { getIsLoaded, getSelectedRoomId, getSelectedUserId, State } from '../../chat/reducers';
import * as uuid from 'uuid/v4';
import { IMessage } from '@ec-shared/models/message';
import { catchError, concatMap, reduce, take, takeWhile, tap } from 'rxjs/operators';
import { Constants, MessageType } from '@ec-shared/utils/constants';
import { ApiService } from '@ec-core/services/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IRoom } from '@ec-shared/models/room';
import { of } from 'rxjs';

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

  fetchRooms() {
    let rooms: IRoom[] = [];
    const userId = this.apiService.getItem(Constants.USER_UID);
    this.apiService.fetchUserRooms(userId)
      .pipe(take(1))
      .subscribe((res: string[]) => {
        let rooms = res;
        const trigger = new BehaviorSubject<string>(rooms.shift());
        trigger.asObservable().pipe(
          concatMap((r: string) => {
            if (r) {
              this.apiService.fetchRoomDetails(r)
                .pipe(
                  tap((room) => {
                    if (rooms && rooms.length > 0) {
                      trigger.next(rooms.shift());
                    }
                    else {
                      trigger.complete();
                    }
                  }),
                  catchError(() => of({})
                  )
                );
            } else {
              return of({});
            }
          }),
          takeWhile(room => room['id']),
          reduce((accumulator, room) => {
            return [...accumulator, room];
          })
        ).subscribe((rooms: IRoom[]) => {
          this.store.dispatch(new FetchRoomSuccess(rooms));
        });
      });
  }
}
