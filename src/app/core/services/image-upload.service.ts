import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '@ec-core/reducers';
import { fromEvent } from 'rxjs';
import { NotificationService } from '@ec-core/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  private imageQueue: File[] = [];
  readonly fileSizeExceedMessage = 'File size should not be greater then 2MB';

  constructor(private store: Store<RootState>,
              private notificationService: NotificationService) {
    console.log('init');
    let online$ = fromEvent(window, 'online');
    let offline$ = fromEvent(window, 'offline');
    online$.subscribe((e) => console.log('is online', e));
    offline$.subscribe((e) => console.log('is offline', e));
  }

  pushImage(file: File) {
    if (!file) {
      return;
    }
    if (file.size / (1024 * 1024) > 2) {
      this.notificationService.error(this.fileSizeExceedMessage);
      return;
    }
    this.imageQueue.push(file);
    this.startQueueProcessing();
  }

  startQueueProcessing() {
    let file = this.imageQueue.shift();

  }
}
