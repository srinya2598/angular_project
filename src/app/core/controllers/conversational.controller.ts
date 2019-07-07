import { Injectable } from '@angular/core';
import { DbService, RxCollections } from '@ec-core/services/database.service';
import {
  CreateRoom,
  FetchMessage, FetchRooms, FetchRoomsFailed,
  FetchRoomSuccess,
  SendMessage,
  SetSelectedRoomId,
  SetSelectedUserId
} from '../../chat/actions/message';
import { select, Store } from '@ngrx/store';
import {
  getIsLoaded,
  getIsRoomsLoaded,
  getIsRoomsLoading, getRoomMessages,
  getRoomsList,
  getSelectedRoomId,
  getSelectedUserId,
  getUserRoomIds,
  State
} from '../../chat/reducers';
import * as uuid from 'uuid/v4';
import { IMessage } from '@ec-shared/models/message';
import { catchError, concatMap, filter, map, reduce, switchMap, take, tap } from 'rxjs/operators';
import { Constants, MessageType } from '@ec-shared/utils/constants';
import { ApiService } from '@ec-core/services/api.service';
import { BehaviorSubject, combineLatest, Observable, forkJoin } from 'rxjs';
import { IRoom } from '@ec-shared/models/room';
import { of } from 'rxjs';
import { NotificationService } from '@ec-core/services/notification.service';
import { getLoggedInUser } from '../../auth/reducer';
import { State as AuthState } from '../../auth/reducer/';
import { getSelectedProductUserDetails, State as ProductState } from '../../dashboard/reducers/';
import { IUser } from '@ec-shared/models/users';

@Injectable({
  providedIn: 'root'
})
export class ConversationalController {
  constructor(private dbService: DbService,
              private chatStore: Store<State>,
              private apiService: ApiService,
              private notificationService: NotificationService,
              private authStore: Store<AuthState>,
              private productState: Store<ProductState>) {
    this.setUpMessageChannel();
    this.fetchMessage();
    this.fetchRooms();
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
    this.apiService.sendMessage(selectedUserId, message).subscribe(() => {
      this.dbService.getCollection(RxCollections.MESSAGES).insert(message).then(() => {
        this.chatStore.dispatch(new SendMessage(message));
      });
    });

  }

  fetchRooms() {
    let rooms: IRoom[] = [];
    const userId = this.apiService.getItem(Constants.USER_UID);
    let isRoomsLoaded$ = this.chatStore.select(getIsRoomsLoaded);
    let isRoomsLoading$ = this.chatStore.select(getIsRoomsLoading);
    combineLatest(isRoomsLoaded$, isRoomsLoading$).pipe(
      take(1),
      map(([isLoaded, isLoading]) => isLoaded || isLoading),
      filter(res => !res),
      switchMap(() => {
        this.chatStore.dispatch(new FetchRooms());
        return this.apiService.fetchUserRooms(userId);
      })
    ).pipe(take(1)).subscribe((res: string[]) => {
      if (!res || res.length <= 0) {
        this.chatStore.dispatch(new FetchRoomsFailed());
        return;
      }
      let rooms = res;
      const trigger = new BehaviorSubject<string>(rooms.shift());
      trigger.asObservable().pipe(
        concatMap((r: string) => {
          if (r) {
            return this.apiService.fetchRoomDetails(r)
              .pipe(
                take(1),
                tap((room) => {
                  if (rooms && rooms.length > 0) {
                    trigger.next(rooms.shift());
                  } else {
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
        filter(room => room['id']),
        reduce((accumulator, room) => {
          return [...accumulator, room];
        }, [])
      ).subscribe((rooms: IRoom[]) => {
        this.chatStore.dispatch(new FetchRoomSuccess(rooms));

      });
    });
  }

  isRoomsExisting(id: string): string | boolean {
    let roomId: string;
    if (!id) {
      return false;
    }
    this.chatStore.select(getRoomsList).subscribe((rooms: IRoom[]) => {
      if (rooms && rooms.length) {
        for (let iterator = 0; iterator < rooms.length; iterator++) {
          let participants = rooms[iterator].participants;
          if (participants[0].id === id || participants[1].id === id) {
            roomId = rooms[iterator].id;
            break;
          }
        }
      }
    });
    return roomId ? roomId : false;
  }


  setSelectedUserId(userId: string) {
    if (!userId) {
      return;
    }
    this.chatStore.dispatch(new SetSelectedUserId(userId));
  }

  setSelectedRoomId(roomId: string) {
    if (!roomId) {
      return;
    }
    this.chatStore.dispatch(new SetSelectedRoomId(roomId));
  }


  getSelectedUserId(): Observable<string> {
    return this.chatStore.select(getSelectedUserId);
  }

  getSelectedRoomId(): Observable<string> {
    return this.chatStore.select(getSelectedRoomId);
  }

  getIsRoomsLoading(): Observable<boolean> {
    return this.chatStore.select(getIsRoomsLoading);
  }

  async createRoom(): Promise<string> {
    let loggedInUser: IUser;
    let selectedUser: IUser;
    let roomId: string;
    let room: IRoom;
    const loggedInUserId = this.apiService.getItem(Constants.USER_UID);
    this.authStore.select(getLoggedInUser).subscribe((user: IUser) => loggedInUser = user);
    this.productState.select(getSelectedProductUserDetails).pipe(take(1)).subscribe((user: IUser) => selectedUser = user);
    room = {
      id: uuid(),
      participants: [selectedUser, loggedInUser]
    };
    try {
      roomId = await this.setRoomDetails(loggedInUserId, room);
      this.notificationService.success('Room created!');
    } catch (e) {
      this.notificationService.error('An error was encountered in creating the room!');
    }
    return roomId;
  }

  private setRoomDetails(id: string, room: IRoom): Promise<string> {
    const userId = this.apiService.getItem(Constants.USER_UID);
    return new Promise((resolve, reject) => {
      if (!id || !room.id) {
        reject('Invalid id');
      }
      let roomIds: string[];
      this.chatStore.select(getUserRoomIds).subscribe((ids: string[]) => {
          roomIds = ids;
        }
      );
      let userEvent$ = this.apiService.setUserRooms([...roomIds, room.id], userId);
      let roomEvent$ = this.apiService.setRoomDetails(room);
      forkJoin(userEvent$, roomEvent$).subscribe(() => {
          this.chatStore.dispatch(new CreateRoom(room));
          resolve(room.id);
        },
        () => {
          reject('Something went wrong');
        });
    });
  }

  private fetchMessage() {
    const userId = this.apiService.getItem(Constants.USER_UID);
    this.chatStore.select(getIsLoaded).pipe(take(1)).subscribe(isLoaded => {
      if (!isLoaded) {

        this.dbService.getCollection(RxCollections.MESSAGES)
          .find({$or: [{sender: {$eq: userId}}, {receiver: {$eq: userId}}]})
          .$
          .pipe(take(1))
          .subscribe((res: IMessage[]) => {
            this.chatStore.dispatch(new FetchMessage(res));
          });
      }
    });
  }

  private setUpMessageChannel() {
    const userId = this.apiService.getItem(Constants.USER_UID);
    if (!userId) {
      return;
    }
    this.apiService.getMessageStream(userId).subscribe((message: IMessage) => {
      if (message) {
        let roomId = this.isRoomsExisting(userId);
        if (!roomId) {
          this.chatStore.select(getUserRoomIds).pipe(switchMap((ids: string[]) => {
            return this.apiService.setUserRooms([...ids, message.roomId], userId);

          })).subscribe(() => {
            this.dbService.getCollection(RxCollections.MESSAGES).insert(message);
            this.chatStore.dispatch(new SendMessage(message));
          });
        }
      }
    });
  }

  fetchRoomMessages(roomId: string): Observable<IMessage[]> {
    if (!roomId) {
      return of([]);
    }
    return this.chatStore.select(state => getRoomMessages(state, roomId));
  }

  getIsLoaded(): Observable<boolean> {
    return this.chatStore.select(getIsRoomsLoaded);
  }

  getRoomLists() {
    return this.chatStore.select(getRoomsList);
  }

  fetchLastMessage(roomId: string) {
    let message;
    this.fetchRoomMessages(roomId).subscribe(res => {
      if (res.length > 0) {
        const length = res.length;
        message = {
          text: res[length - 1].text,
          timestamp: res[length - 1].timestamp
        };
      }
    });
    return message;
  }
}

