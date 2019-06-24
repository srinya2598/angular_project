import { Injectable } from '@angular/core';
import { DbService, RxCollections } from '@ec-core/services/database.service';

@Injectable({
  providedIn: 'root'
})
export class ConversationalController {
  constructor(private dbService: DbService) {
  }

  sendMessage(message: string) {
    // this.dbService.getCollection(RxCollections.MESSAGES).insert({
    //   id: '12345vjndkjg232',
    //   roomId: 'iasdga',
    //   timestamp: new Date().getTime(),
    //   text: 'zhjsbugbaskf',
    //   sender: 'dskjfhua',
    //   receiver: 'SBjhk',
    // });
    this.dbService.getCollection(RxCollections.MESSAGES).find().where('roomId').eq('iasdga').$.subscribe(r => console.log(r));

  }
}
