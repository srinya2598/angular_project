import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { NgxLoadingModule } from 'ngx-loading';
import { StoreModule } from '@ngrx/store';
import { authRootReducer } from '../auth/reducer';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forFeature('auth', authRootReducer),
    NgxLoadingModule.forRoot({ backdropBorderRadius: '3px' })
  ],
  exports: [
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    NgxLoadingModule,
  ],
  entryComponents: [NotificationComponent]
})

export class SharedModule {

}
