import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  exports: [CommonModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule]
})
export class MaterialModule {}
