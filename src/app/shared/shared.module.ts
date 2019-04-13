import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { NgxLoadingModule } from 'ngx-loading';
import { StoreModule } from '@ngrx/store';
import { authRootReducer } from '../auth/reducer';
import { NotificationComponent } from './components/notification/notification.component';
import { AvatarModule } from 'ng2-avatar';
import {productReducer} from '../dashboard/reducers/product';
import {productRootReducer} from '../dashboard/reducers';

@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forFeature('auth', authRootReducer),
    StoreModule.forFeature('product',productRootReducer),
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
