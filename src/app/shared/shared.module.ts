import {NgModule} from '@angular/core';
import { CommonModule} from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { NgxLoadingModule } from 'ngx-loading';

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
    NgxLoadingModule
  ]
})

export class SharedModule {
  
}
