import {Injectable} from '@angular/core';
import {DbService, RxCollections} from '@ec-core/services/database.service';
import {
  CreateRoom,
  FetchMessage, FetchRooms,
  FetchRoomSuccess,
  SendMessage,
  SetSelectedRoomId,
  SetSelectedUserId
} from '../../chat/actions/message';
import {Store} from '@ngrx/store';
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
import {IMessage} from '@ec-shared/models/message';
import {catchError, concatMap, filter, map, reduce, switchMap, take, tap} from 'rxjs/operators';
import {Constants, MessageType} from '@ec-shared/utils/constants';
import {ApiService} from '@ec-core/services/api.service';
import {BehaviorSubject, combineLatest, Observable, forkJoin} from 'rxjs';
import {IRoom} from '@ec-shared/models/room';
import {of} from 'rxjs';
import {NotificationService} from '@ec-core/services/notification.service';
import {IUser} from '@ec-shared/models/users';


@Injectable({
  providedIn: 'root'
})
export class ConversationalController {
  constructor(private dbService: DbService,
              private store: Store<State>,
              private apiService: ApiService,
              private notificationService: NotificationService) {
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
        this.store.dispatch(new SendMessage(message));
      });
    });

  }

  fetchRooms() {
    let rooms: IRoom[] = [];
    const userId = this.apiService.getItem(Constants.USER_UID);
    let isRoomsLoaded$ = this.store.select(getIsRoomsLoaded);
    let isRoomsLoading$ = this.store.select(getIsRoomsLoading);
    combineLatest(isRoomsLoaded$, isRoomsLoading$).pipe(
      take(1),
      map(([isLoaded, isLoading]) => isLoaded || isLoading),
      filter(res => !res),
      switchMap(() => {
        this.store.dispatch(new FetchRooms());
        return this.apiService.fetchUserRooms(userId);
      })
    ).pipe(take(1)).subscribe((res: string[]) => {
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
        this.store.dispatch(new FetchRoomSuccess(rooms));

      });
    });
  }

  isRoomsExisting(id: string): string | boolean {
    let roomId: string;
    if (!id) {
      return false;
    }
    this.store.select(getRoomsList).subscribe((rooms: IRoom[]) => {
      if (rooms && rooms.length) {
        for (let iterator = 0; iterator < rooms.length; iterator++) {
          if (rooms[iterator].participants.includes(id)) {
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
    this.store.dispatch(new SetSelectedUserId(userId));
  }

  setSelectedRoomId(roomId: string) {
    if (!roomId) {
      return;
    }
    this.store.dispatch(new SetSelectedRoomId(roomId));
  }


  getSelectedUserId(): Observable<string> {
    return this.store.select(getSelectedUserId);
  }

  getSelectedRoomId(): Observable<string> {
    return this.store.select(getSelectedRoomId);
  }

  async createRoom(): Promise<string> {
    let selectedUserDetails: IUser;
    let loggedInUserDetails: IUser;
    let selectedUserId: string;
    let roomId: string;
    const loggedInUserId = this.apiService.getItem(Constants.USER_UID);
    this.getSelectedUserId().pipe(take(1)).subscribe(id => selectedUserId = id);
    this.apiService.getUserDetails(selectedUserId).subscribe((res: IUser) => {
      selectedUserDetails = res;
    });
    this.apiService.getUserDetails(loggedInUserId).subscribe((res: IUser) => {
      loggedInUserDetails = res;
    });
    const room: IRoom = {
      id: uuid(),
      participants: [loggedInUserDetails, selectedUserDetails]
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
      this.store.select(getUserRoomIds).subscribe((ids: string[]) => {
          roomIds = ids;
        }
      );
      let userEvent$ = this.apiService.setUserRooms([...roomIds, room.id], userId);
      let roomEvent$ = this.apiService.setRoomDetails(room);
      forkJoin(userEvent$, roomEvent$).subscribe(() => {
          this.store.dispatch(new CreateRoom(room));
          resolve(room.id);
        },
        () => {
          reject('Something went wrong');
        });
    });
  }

  private fetchMessage() {
    this.store.select(getIsLoaded).pipe(take(1)).subscribe(isLoaded => {
      if (!isLoaded) {

        this.dbService.getCollection(RxCollections.MESSAGES)
          .find()
          .$
          .pipe(take(1))
          .subscribe((res: IMessage[]) => {
            this.store.dispatch(new FetchMessage(res));
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
          this.store.select(getUserRoomIds).pipe(switchMap((ids: string[]) => {
            return this.apiService.setUserRooms([...ids, message.roomId], userId);

          })).subscribe(() => {

          });

        }
        this.dbService.getCollection(RxCollections.MESSAGES).insert(message);
        this.store.dispatch(new SendMessage(message));
      }

    });
  }

  fetchRoomMessages(roomId: string): Observable<IMessage[]> {
    if (!roomId) {
      return;
    }
    return this.store.select(state => getRoomMessages(state, roomId));
  }

  getIsLoaded(): Observable<boolean> {
    return this.store.select(getIsRoomsLoaded);
  }

  getRoomLists() {
    return this.store.select(getRoomsList);
  }

  fetchLastMessage(roomId: string) {
    this.fetchRoomMessages(roomId).subscribe(res => {
      if (res.length > 0) {
        const length = res.length;
        const message: IMessage = {
          text: res[length - 1].text,
          timestamp: res[length - 1].timestamp
        };
return  message;
      }


    });
  }
}

