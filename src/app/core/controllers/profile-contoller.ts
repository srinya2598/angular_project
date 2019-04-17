import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Store} from '@ngrx/store';
import {State} from '../../dashboard/reducers';
import {ApiService} from '../services/api.service';
import {NotificationService} from '../services/notification.service';

@Injectable({

  providedIn: 'root'
})
export class ProfileContoller {

  uploadPercent: BehaviorSubject<number>;
  downloadUrlProfile: BehaviorSubject<string>;

  constructor(private  store: Store<State>,
              private apiService: ApiService,
              private notificationService: NotificationService,
              private profileController: ProfileContoller
  ) {
    this.uploadPercent = new BehaviorSubject<number>(0);
    this.downloadUrlProfile = new BehaviorSubject('null');
  }
  uploadProfileImage(file: File  ): BehaviorSubject<any>[]{
    const fileName = file.name;
    this.apiService.getProfileImageRef(fileName).getDownloadURL().subscribe((url)=>{
      if(url){
        this.downloadUrlProfile.next(url);

      }
    });
    return[this.uploadPercent, this.downloadUrlProfile];

  }
}
