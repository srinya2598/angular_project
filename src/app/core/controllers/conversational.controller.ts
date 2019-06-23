import {Injectable} from '@angular/core';
import {DbService, RxCollections} from '@ec-core/services/database.service';
import {CommonUtils} from '@ec-shared/utils/common.utils';

@Injectable({
  providedIn: 'root'
})
export class ConversationalController {
  constructor(private dbService: DbService) {
  }

  sendMessage(message: string) {
    this.dbService.getCollection(RxCollections.MESSAGES).insert({
      id: '12345vjndkjg232',
      roomid: 'iasdga',
      timestamp: new Date().getTime(),
      text: 'zhjsbugbaskf',
      sender: 'dskjfhua',
      receiver: 'SBjhk',
    });
    console.log('message sent');
  }

   }
