import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {State} from '../../dashboard/reducers';
import {ApiService} from '../services/api.service';
import {NotificationService} from '../services/notification.service';
import {finalize} from 'rxjs/operators';

@Injectable({

  providedIn: 'root'
})
export class ProfileController {

  uploadPercent: BehaviorSubject<number>;
  downloadUrlProfile: BehaviorSubject<string>;

  constructor(private  store: Store<State>,
              private apiService: ApiService,
              private notificationService: NotificationService
  ) {
    this.uploadPercent = new BehaviorSubject<number>(0);
    this.downloadUrlProfile = new BehaviorSubject('null');
  }
  uploadProfileImage(file: File): BehaviorSubject<any>[] {
    const fileName = file.name;
    const ref = this.apiService.getProfileImageRef(fileName);
    const task = this.apiService.uploadProfileImage(fileName, file, ref);
    task.percentageChanges().subscribe(percent => this.uploadPercent.next(percent));
    task.snapshotChanges().pipe(
      finalize(() => ref.getDownloadURL().subscribe(url => this.downloadUrlProfile.next(url)))
    ).subscribe(null, (error) => {
      this.notificationService.error(error.message);
    });
    return [this.uploadPercent, this.downloadUrlProfile];
  }
}
