import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomValidation } from './custom-validation';




@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [
    CustomValidation, // Provide your custom validators here
  ],
})
export class AppValidatorModule { }
