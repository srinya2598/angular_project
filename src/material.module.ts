import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatSelectModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule
  ],
  exports: [
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule
  ]
})
export class MaterialModule {
}
