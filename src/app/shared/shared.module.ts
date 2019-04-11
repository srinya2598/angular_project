import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { NgxLoadingModule } from 'ngx-loading';
import { StoreModule } from '@ngrx/store';
import { authRootReducer } from '../auth/reducer';
import { NotificationComponent } from './components/notification/notification.component';
import { AvatarModule } from 'ng2-avatar';

@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forFeature('auth', authRootReducer),
    NgxLoadingModule.forRoot({ backdropBorderRadius: '3px' }),
    AvatarModule.forRoot()
  ],
  exports: [
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    NgxLoadingModule,
    AvatarModule
  ],
  entryComponents: [NotificationComponent]
})

export class SharedModule {

}
