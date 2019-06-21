import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IBroadcaster } from '@ec-shared/models/broadcaster';

@Injectable({
  providedIn: 'root'
})
export class BroadcasterService {

  private broadcaster: Subject<IBroadcaster>;

  constructor() {
    this.broadcaster = new Subject<IBroadcaster>();
  }

  emit(key: string, payload?: any) {
    const event: IBroadcaster = {
      key, payload
    };
    this.broadcaster.next(event);
  }

  listen(key: string): Observable<string> {
    return this.broadcaster.asObservable().pipe(
      filter((event: IBroadcaster) => event.key === key),
      map((event: IBroadcaster) => event.payload)
    );
  }
}
