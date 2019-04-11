import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule, MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule
} from '@angular/material';

const modules = [
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatIconModule,
  MatSnackBarModule,
  MatSelectModule,
  MatButtonModule,
  MatMenuModule,
  MatDialogModule,
  MatProgressSpinnerModule
];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MaterialModule {
}
