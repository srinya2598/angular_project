import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { NgxLoadingModule } from 'ngx-loading';
import { StoreModule } from '@ngrx/store';
import { authRootReducer } from '../auth/reducer';
import { NotificationComponent } from './components/notification/notification.component';
import { AvatarModule } from 'ng2-avatar';
import {productRootReducer} from '../dashboard/reducers';
import { ButtonComponent } from './components/button/button.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SingleproductComponent } from './components/singleproduct/singleproduct.component';
import { ProductComponent } from './components/product/product.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { messageRootReducer} from '../chat/reducers';
import { CartproductComponent } from './components/cartproduct/cartproduct.component';
import { NgxEmojiPickerModule } from 'ngx-emoji-picker';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

@NgModule({
  declarations: [
    NotificationComponent,
    ButtonComponent,
    SingleproductComponent,
    ProductComponent,
    PagenotfoundComponent,
    CartproductComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    StoreModule.forFeature('auth', authRootReducer),
    StoreModule.forFeature('product', productRootReducer),
    StoreModule.forFeature('message', messageRootReducer),
    NgxLoadingModule.forRoot({ backdropBorderRadius: '3px' }),
    AvatarModule.forRoot(),
    NgxEmojiPickerModule,
    PickerModule,
  ],
  exports: [
    ReactiveFormsModule,
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    NgxLoadingModule,
    AvatarModule,
    ButtonComponent,
    SingleproductComponent,
    ProductComponent,
    CartproductComponent,
    NgxEmojiPickerModule,
    PickerModule
  ],
  entryComponents: [NotificationComponent]
})

export class SharedModule {

}
