import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatIconModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatProgressSpinnerModule,
  MatCheckboxModule
} from '@angular/material';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { TextFieldModule } from '@angular/cdk/text-field';

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    TextFieldModule,
    NgxMaterialTimepickerModule
  ]
})
export class MaterialModule {}
