import {NgModule} from '@angular/core';
import { CommonModule} from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { NgxLoadingModule } from 'ngx-loading';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxLoadingModule.forRoot({backdropBorderRadius: '3px' })
  ],
  exports: [
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    NgxLoadingModule,
  ]
})

export class SharedModule {
  
}
