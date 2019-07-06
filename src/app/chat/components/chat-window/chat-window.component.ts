import {AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ConversationalController} from '@ec-core/controllers/conversational.controller';
import {IUser} from '@ec-shared/models/users';
import {take} from 'rxjs/operators';
import {ApiService} from '@ec-core/services/api.service';
import {IMessage} from '@ec-shared/models/message';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit, AfterViewChecked {
  @Input() selectedUser: IUser;
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


  constructor(private conversationalController: ConversationalController,
              private apiService: ApiService) {
    this.message = new FormControl(null);

    this.conversationalController.getSelectedUserId().pipe(take(1)).subscribe(id => {


      this.apiService.getUserDetails(id).pipe(take(1)).subscribe((res: IUser) => {
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

    let roomId: string;
    this.conversationalController.getSelectedRoomId().subscribe(res => roomId = res);
    this.conversationalController.getSelectedUserId();
    this.conversationalController.fetchRoomMessages(roomId).subscribe((res: IMessage[]) => {
      this.isScrollUpdateNeeded = true;
      this.autoScrollDown = true;
      this.messages = res;
    });
  }

  ngAfterViewChecked(): void {
    this.updateScroll();
  }

  sendMessage() {
    this.conversationalController.sendMessage(this.message.value);
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

