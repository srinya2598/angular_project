import { Injectable } from '@angular/core';
import { DbService, RxCollections } from '@ec-core/services/database.service';
import {
  AddRoom,
  CreateRoom,
  FetchMessage,
  FetchRooms,
  FetchRoomsFailed,
  FetchRoomSuccess,
  RemoveMessage,
  SendMessage,
  SetSelectedMessage,
  SetSelectedRoomId,
  SetSelectedUserId,
  ToggleFavMessage,
} from '../../chat/actions/message';
import { Store } from '@ngrx/store';
import {
  getIsMessagesLoaded,
  getIsRoomsLoaded,
  getIsRoomsLoading,
  getRoomMessages,
  getRoomsList,
  getSelectedRoomId,
  getSelectedUserId,
  getUserRoomIds,
  State
} from '../../chat/reducers';
import * as uuid from 'uuid/v4';
import { IMessage } from '@ec-shared/models/message';
import { catchError, concatMap, filter, finalize, map, reduce, skip, switchMap, take, tap } from 'rxjs/operators';
import { BroadcasterConstants, Constants, MessageType, StatusType } from '@ec-shared/utils/constants';
import { ApiService } from '@ec-core/services/api.service';
import { BehaviorSubject, combineLatest, forkJoin, Observable, of, Subscription } from 'rxjs';
import { IRoom } from '@ec-shared/models/room';
import { NotificationService } from '@ec-core/services/notification.service';
import { getLoggedInUser } from '../../auth/reducer';
import { State as AuthState } from '../../auth/reducer/';
import { getSelectedMessage, getSelectedProductUserDetails, State as ProductState } from '../../dashboard/reducers/';
import { IUser } from '@ec-shared/models/users';
import { CommonUtils } from '@ec-shared/utils/common.utils';
import { BroadcasterService } from '@ec-core/services/broadcaster.service';
import { AuthController } from '@ec-core/controllers/auth-controller';

@Injectable({
  providedIn: 'root'
})
export class ConversationalController {
  isChannelSetup = false;
  uploadPercent: BehaviorSubject<number>;
  downloadUrlSubject: BehaviorSubject<string>;
  messageChannelSubscription: Subscription;


  constructor(private dbService: DbService,
              private chatStore: Store<State>,
              private apiService: ApiService,
              private notificationService: NotificationService,
              private authStore: Store<AuthState>,
              private productState: Store<ProductState>,
              private broadcasterService: BroadcasterService,
              private authController: AuthController,
  ) {
    this.uploadPercent = new BehaviorSubject<number>(0);
    this.downloadUrlSubject = new BehaviorSubject(null);
    this.checkConnectivity();
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
      isFav: false,
      text: body || '',
      timestamp: new Date().getTime()
    };
    this.dispatchMessage(message, selectedUserId);
  }

  fetchRooms() {
    console.log('fetch rooms');
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
      console.log('Null rooms', rooms);
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
    this.chatStore.select(getRoomsList).pipe(take(1)).subscribe((rooms: IRoom[]) => {
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
        res = res.sort((a, b) => a.timestamp - b.timestamp);
        const length = res.length;
        message = {
          text: res[length - 1].text || '',
          timestamp: res[length - 1].timestamp || 0
        };
      }
    });
    return message;
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

  fetchMessages() {
    console.log('fetch msg');
    const userId = this.apiService.getItem(Constants.USER_UID);
    this.chatStore.select(getIsMessagesLoaded).pipe(take(1)).subscribe(isLoaded => {
      if (!isLoaded) {

        this.dbService.getCollection(RxCollections.MESSAGES)
          .find({ $or: [{ sender: { $eq: userId } }, { receiver: { $eq: userId } }] })
          .$
          .pipe(take(1))
          .subscribe((res: IMessage[]) => {
            const mappedMessages = CommonUtils.mapMessages(res);
            this.chatStore.dispatch(new FetchMessage(mappedMessages));
          });
      }
    });
  }

  setUpMessageChannel() {
    console.log('setup');
    if (this.isChannelSetup) {
      return;
    }

    const userId = this.apiService.getItem(Constants.USER_UID);
    if (!userId) {
      return;
    }

    if (this.messageChannelSubscription) {
      return;
    }

    this.messageChannelSubscription = this.apiService.getMessageStream(userId).pipe(skip(1)).subscribe((message: IMessage) => {
      if (message) {
        let roomId = this.isRoomsExisting(userId);
        console.log(roomId);
        if (!roomId) {
          this.chatStore.select(getUserRoomIds).pipe(
            (take(1)),
            switchMap((ids: string[]) => {
              return this.apiService.setUserRooms([...ids, message.roomId], userId);
            })).subscribe(() => {
            this.dbService.getCollection(RxCollections.MESSAGES).insert(message);
            console.log('Send channel 1()');
            this.apiService.fetchRoomDetails(message.roomId).subscribe((room: IRoom) => {
              if (room) {
                this.chatStore.dispatch(new AddRoom(room));
                this.chatStore.dispatch(new SendMessage(message));
              }
            });
          });
        } else {
          this.dbService.getCollection(RxCollections.MESSAGES).insert(message);
          console.log('Send channel 2()');
          this.chatStore.dispatch(new SendMessage(message));
        }
      }
    });
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

  removeMessage(message: IMessage) {
    if (!message.id) {
      return;
    }
    const query = this.dbService.getCollection(RxCollections.MESSAGES).find().where('id').eq(message.id);
    query.remove().then(() => {
      this.chatStore.dispatch(new RemoveMessage(message));
      this.notificationService.success('Message deleted successfully!');
    }).catch((e) => {
      this.notificationService.error('Some error encountered while deleting the message!');
    });
  }

  setSelectedMessage(forwardText: string) {
    if (!forwardText) {
      return;
    }
    this.chatStore.dispatch(new SetSelectedMessage(forwardText));
    console.log(forwardText);
  }

  getSelectedMessage() {
    return this.chatStore.select(getSelectedMessage);
  }

  forwardMessage(selectedMessage: string) {
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
      isFav: false,
      text: selectedMessage || '',
      timestamp: new Date().getTime()
    };
    this.dispatchMessage(message, selectedMessage);

  }

  attachImageFile(file: File): BehaviorSubject<any>[] {
    const fileName = file.name;
    let roomId: string;
    this.getSelectedRoomId().subscribe(res => roomId = res);
    const ref = this.apiService.getAttachedFileRef(roomId, fileName);
    const task = this.apiService.uploadAttachedFile(fileName, file, ref);
    task.percentageChanges().subscribe(percent => {
      this.uploadPercent.next(percent);
      console.log(this.uploadPercent);
    });
    task.snapshotChanges().pipe(
      finalize(() => ref.getDownloadURL().subscribe(url => this.downloadUrlSubject.next(url)))
    ).subscribe(null, (error) => {
      this.notificationService.error(error.message);
    });
    return [this.uploadPercent, this.downloadUrlSubject];
  }

  sendFile(downloadUrl: string, caption: string) {
    if (!downloadUrl) {
      return;
    }
    let selectedUserId: string;
    let selectedRoomId: string;
    const userId = this.apiService.getItem(Constants.USER_UID);
    this.getSelectedUserId().subscribe(res => selectedUserId = res);
    this.getSelectedRoomId().subscribe(res => selectedRoomId = res);
    const message: IMessage = {
      id: uuid(),
      type: MessageType.IMAGE,
      roomId: selectedRoomId,
      timestamp: new Date().getTime(),
      isFav: false,
      sender: userId,
      receiver: selectedUserId,
      image: {
        image_url: downloadUrl,
        caption: caption || ''
      }
    };
    this.dispatchMessage(message, selectedUserId);

  }

  setFavMessage(message: IMessage) {
    console.log('[Set fav] called');
    const query = this.dbService.getCollection(RxCollections.MESSAGES).find().where('id').eq(message.id);
    query.update({
        $set: {
          isFav: !message.isFav
        }
      }
    ).then((res) => {
      console.log('[Set fav] updated', res);
      this.chatStore.dispatch(new ToggleFavMessage(message));
    });
  }

  checkConnectivity() {
    this.broadcasterService.listen(BroadcasterConstants.NETWORK_CONNECTED).subscribe(() => {
      this.getOfflineMessages();
      this.authController.setUserStatusOnline().subscribe(() => {
        console.log('i am online');
      });
    });
    this.broadcasterService.listen(BroadcasterConstants.NETWORK_DISCONNECTED).subscribe(() => {
        console.log('f');
        this.authController.setUserStatusOffline().subscribe(() => {
          console.log('i am offline');
        });
      }
    );
  }

  getSelectedUserStatus(selectedUserId: string) {
    return this.apiService.getUserStatus(selectedUserId);
  }


  dispatchMessage(message: IMessage, selectedUserId: string) {
    this.apiService.getUserStatus(selectedUserId).pipe(take(1)).subscribe((status) => {
      if (status === StatusType.ONLLNE) {
        console.log('a');
        this.apiService.sendMessage(selectedUserId, message).subscribe(() => {
          this.dbService.getCollection(RxCollections.MESSAGES).insert(message).then(() => {
            console.log('Send message()');
            this.chatStore.dispatch(new SendMessage(message));
          });
        });

      } else {
        console.log('b');
        let oldOfflineMessages: IMessage[];
        this.apiService.getMessageOffline(selectedUserId).pipe(take(1)).subscribe((messages: IMessage[]) => {
          oldOfflineMessages = messages || [];
          console.log('c');
          let newOfflineMessages: IMessage[];
          console.log(oldOfflineMessages);
          newOfflineMessages = [...oldOfflineMessages, message];
          this.apiService.setMessageOffline(selectedUserId, newOfflineMessages).subscribe(() => {
            this.dbService.getCollection(RxCollections.MESSAGES).insert(message).then(() => {
              this.chatStore.dispatch(new SendMessage(message));
              console.log('d');
            });
          });
        });

      }
    });
  }

  getOfflineMessages() {
    const userId = this.apiService.getItem(Constants.USER_UID);
    this.apiService.getMessageOffline(userId).pipe(take(1)).subscribe((messages: IMessage[]) => {
      if (messages && messages.length > 0) {
        messages.forEach(offlineMessage => {
          console.log('e');
          this.dbService.getCollection(RxCollections.MESSAGES).insert(offlineMessage).then(() => {
          });
          console.log('f');
        });
        this.chatStore.dispatch(new FetchMessage(messages));

        this.apiService.deleteMessageOffline(userId).then(() => {
          console.log('g');
          console.log('no new messages');
        });
      }
    });
  }
}
