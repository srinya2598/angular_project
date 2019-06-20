import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {DbService, RxCollections} from '@ec-core/services/database.service';
import {CommonUtils} from '@ec-shared/utils/common.utils';
import {ActivatedRoute} from '@angular/router';
import {log} from 'util';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {

  message: FormControl;
  showSendMessageButton = false;
  Database: any;

  constructor(private DbService: DbService, private Route: ActivatedRoute) {
    this.message = new FormControl(null);
  }

  ngOnInit() {

    this.Database = this.Route.snapshot.data;
    console.log('resolver working!');

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
    console.log('resolver working?');
  }
}

