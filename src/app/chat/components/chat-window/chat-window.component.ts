import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {DbService, RxCollections} from '@ec-core/services/database.service';
import {CommonUtils} from '@ec-shared/utils/common.utils';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {

  message: FormControl;
  showSendMessageButton = false;

  constructor(private DbService: DbService) {
    this.message = new FormControl(null);
  }

  ngOnInit() {
    this.message.valueChanges.subscribe((value) => {
      if (value.length === 0) {
        this.showSendMessageButton = false;
        return;
      }
      this.showSendMessageButton = true;
    });
  }

  sendMessage() {
    this.DbService.getCollection(RxCollections.MESSAGES).insert({
      id: CommonUtils.getRandomId(),
      type: 'textMessage',
      timestamp: new Date().getTime(),
      text: this.message.value,

    });

  }
}

