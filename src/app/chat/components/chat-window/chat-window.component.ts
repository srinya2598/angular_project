import {AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ConversationalController} from '@ec-core/controllers/conversational.controller';
import {IUser} from '@ec-shared/models/users';
import {switchMap, take} from 'rxjs/operators';
import {ApiService} from '@ec-core/services/api.service';
import {IMessage} from '@ec-shared/models/message';
import {Router} from '@angular/router';
import {CommonUtils} from '@ec-shared/utils/common.utils';
import {NotificationService} from '@ec-core/services/notification.service';
import {MatDialog} from '@angular/material';
import {ImageContainerComponent} from '../image-container/image-container.component';
import { MessageType } from '@ec-shared/utils/constants';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit, AfterViewChecked {
  message: FormControl;
  showSendMessageButton = false;
  firstName: string;
  lastName: string;
  profileUrl: string;
  messages: IMessage[];
  private isScrollUpdateNeeded = true;
  private scrollHeight: number;
  private scrollTop: number;
  private autoScrollDown = true;
  @ViewChild('chatContainer') chatContainer: ElementRef;
  uploadPercent = 0;
  downloadUrl = null;


  constructor(private conversationalController: ConversationalController,
              private apiService: ApiService,
              private router: Router,
              private notificationService: NotificationService,
              private dialog: MatDialog) {
    this.message = new FormControl(null);
    this.conversationalController.getSelectedUserId().pipe(take(1)).subscribe(id => {
      this.apiService.getUserDetails(id).pipe(take(1)).subscribe((res: IUser) => {
        console.log('User', res);
        this.firstName = res.firstName;
        this.lastName = res.lastName;
        this.profileUrl = res.profileUrl;
      });
    });
  }

  ngOnInit() {
    this.message.valueChanges.subscribe((value) => {
      if (value.length === 0) {
        this.showSendMessageButton = false;
        return;
      }
      this.showSendMessageButton = true;
    });

    this.conversationalController.getSelectedRoomId().pipe(
      switchMap(roomId => {
        return this.conversationalController.fetchRoomMessages(roomId);
      })
    ).subscribe((res: IMessage[]) => {
      const roomMessages = res.sort((a, b) => {
        return a.timestamp - b.timestamp;
      });
      this.isScrollUpdateNeeded = true;
      this.autoScrollDown = true;
      this.messages = roomMessages;
    });

    this.conversationalController.getSelectedMessage().pipe(take(1)).subscribe((selectedMessage) => {
      console.log('[Selected message] ', selectedMessage);
      if (selectedMessage) {
        this.conversationalController.forwardMessage(selectedMessage);
      }
    });
  }

  ngAfterViewChecked(): void {
    this.updateScroll();
  }

  sendMessage() {
    this.conversationalController.sendMessage(this.message.value);
  }

  removeMessage(message: IMessage) {
    this.conversationalController.removeMessage(message);
  }

  forward(forwardText: string) {
    this.conversationalController.setSelectedMessage(forwardText);
    this.router.navigate(['dashboard/chat/conversations']);
  }

  private updateScroll(): void {
    if (!this.isScrollUpdateNeeded) {
      return;
    }
    const element = this.chatContainer.nativeElement;

    if (this.autoScrollDown) {
      try {
        element.scrollTop = element.scrollHeight;
      } catch (err) {
      }
    } else {
      try {
        element.scrollTop = this.scrollTop + (element.scrollHeight - this.scrollHeight);
      } catch (err) {
      }
    }

    this.scrollHeight = element.scrollHeight;
    this.scrollTop = element.scrollTop;
    this.isScrollUpdateNeeded = true;
  }

  attachImage(event) {
    if (!event) {
      this.notificationService.error('Please select an image');
      return;
    }
    if (!CommonUtils.isImage(event.target.files[0].type)) {
      this.notificationService.error('File type not supported');
      return;
    }

    const response = this.conversationalController.attachImageFile(event.target.files[0]);
    response[0].subscribe(percent => this.uploadPercent = percent);
    response[1].subscribe(res => this.downloadUrl = res);
    console.log(this.downloadUrl);
    this.dialog.open(ImageContainerComponent, {
      width: '60%',
      data: {
        imageUrl: this.downloadUrl,
        uploadPercent: this.uploadPercent
      }
    });



  }


}

