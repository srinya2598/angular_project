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
import { ButtonComponent } from './components/button/button.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SingleproductComponent } from './components/singleproduct/singleproduct.component';

@NgModule({
  declarations: [NotificationComponent, ButtonComponent, SingleproductComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    StoreModule.forFeature('auth', authRootReducer),
    StoreModule.forFeature('product',productRootReducer),
    NgxLoadingModule.forRoot({ backdropBorderRadius: '3px' }),
    AvatarModule.forRoot()
  ],
  exports: [
    ReactiveFormsModule,
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    NgxLoadingModule,
    AvatarModule,
    ButtonComponent,
    SingleproductComponent
  ],
  entryComponents: [NotificationComponent]
})

export class SharedModule {

}
