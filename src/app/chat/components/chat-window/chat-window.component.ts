import { AfterViewChecked, Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ConversationalController } from '@ec-core/controllers/conversational.controller';
import { IUser } from '@ec-shared/models/users';
import { debounceTime, distinctUntilChanged, filter, switchMap, take } from 'rxjs/operators';
import { ApiService } from '@ec-core/services/api.service';
import { IMessage } from '@ec-shared/models/message';
import { Router } from '@angular/router';
import { CommonUtils } from '@ec-shared/utils/common.utils';
import { NotificationService } from '@ec-core/services/notification.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ImageContainerComponent } from '../image-container/image-container.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageType } from '@ec-shared/utils/constants';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit, AfterViewChecked {
  message: FormControl;
  searchControl: FormControl;
  showSendMessageButton = false;
  firstName: string;
  lastName: string;
  profileUrl: string;
  messages: IMessage[];
  searchMessages: IMessage[];
  showSearch = false;
  private isScrollUpdateNeeded = true;
  private scrollHeight: number;
  private scrollTop: number;
  private autoScrollDown = true;
  @ViewChild('chatContainer') chatContainer: ElementRef;
  showSpinner = false;
  dialogRef: MatDialogRef<ImageContainerComponent>;

  constructor(private conversationalController: ConversationalController,
              private apiService: ApiService,
              private router: Router,
              private notificationService: NotificationService,
              private dialog: MatDialog,
              private sanitizer: DomSanitizer) {
    this.message = new FormControl(null);
    this.searchControl = new FormControl(null);
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
      this.isScrollUpdateNeeded = true;
      this.autoScrollDown = true;
      this.messages = CommonUtils.mapMessages(res);
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

  searchMessage() {
    this.showSearch = true;
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
    console.log(event.target.files);
    let dialogData = {
      width: '60%',
      data: {
        file: event.target.files[0]
      }
    };
    if (CommonUtils.isOnMobile()) {
      dialogData.width = '100%';
    }
    this.dialogRef = this.dialog.open(ImageContainerComponent, dialogData);
    this.dialogRef.afterClosed().subscribe((data: { send: boolean, caption: string }) => {
      console.log('closed', data);
      if (data && data.send) {
        this.sendImage(dialogData.data.file, data.caption);
      }
    });
  }

  private sendImage(file: File, caption: string = '') {
    this.showSpinner = true;
    let response = this.conversationalController.attachImageFile(file);
    response[1].subscribe((downloadUrl: string) => {
      if (downloadUrl) {
        this.conversationalController.sendFile(downloadUrl, caption);
        this.showSpinner = false;
      }
    });
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

}

