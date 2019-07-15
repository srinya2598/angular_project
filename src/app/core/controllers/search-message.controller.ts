import { Injectable } from '@angular/core';
import { getSearchKeyword, getSearchMessages, State } from '../../chat/reducers';
import { Store } from '@ngrx/store';
import { IMessage } from '@ec-shared/models/message';
import { switchMap } from 'rxjs/operators';
import { ResetSearchMessages, SetSearchKeyword, SetSearchMessages } from '../../chat/actions/message';
import { Observable } from 'rxjs';
import { MessageType } from '@ec-shared/utils/constants';
import { ConversationalController } from '@ec-core/controllers/conversational.controller';

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

  getSearchMessages(): Observable<IMessage[]> {
    return this.store.select(getSearchMessages);
  }

  resetSearch() {
    this.store.dispatch(new ResetSearchMessages());
  }

  private initilizeSearch() {
    this.getSearchKeyword().subscribe(keyword => {
      console.log('[Search keyword] ', keyword);
      if (!keyword) {
        return;
      }
      let searchMessages: IMessage[] = [];
      this.messages.forEach(message => {
        if (message.type === MessageType.TEXT) {
          if (message.text.indexOf(keyword) > -1) {
            searchMessages.push({ ...message });
          }
        } else {
          if (message.image.caption.indexOf(keyword) > -1) {
            searchMessages.push({ ...message, image: { ...message.image } });
          }
        }
      });
      searchMessages.forEach(m => {
        if (m.type === MessageType.TEXT) {
          m.text = m.text.replace(keyword, '<span class="highlight">$&</span>');
        } else {
          m.image.caption = m.image.caption.replace(keyword, '<span class="highlight">$&</span>');
        }
      });
      console.log('[Search message] ', searchMessages);
      this.store.dispatch(new SetSearchMessages(searchMessages));
    });
  }
}
