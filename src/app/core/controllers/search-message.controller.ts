import { Injectable } from '@angular/core';
import { getSearchKeyword, State } from '../../chat/reducers';
import { Store } from '@ngrx/store';
import { IMessage } from '@ec-shared/models/message';
import { ConversationalController } from 'conversational.controller';
import { switchMap } from 'rxjs/operators';
import { SetSearchKeyword } from '../../chat/actions/message';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchMessageController {
  private messages: IMessage[];

  constructor(private store: Store<State>,
              private convController: ConversationalController) {

    this.convController.getSelectedRoomId().pipe(
      switchMap(roomId => {
        return this.convController.fetchRoomMessages(roomId);
      })
    ).subscribe((res: IMessage[]) => {
      this.messages = res;
    });
    this.initilizeSearch();
  }

  setSearchKeyword(keyword: string) {
    this.store.dispatch(new SetSearchKeyword(keyword));
  }

  getSearchKeyword(): Observable<string> {
    return this.store.select(getSearchKeyword);
  }

  private initilizeSearch() {
    this.getSearchKeyword().subscribe(keyword => {
      if (!keyword) {
        return;
      }
      let searchMessages: IMessage[] = [];

    });
  }
}
