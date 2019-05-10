import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstFormComponent } from './first-form/first-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientFormRoutingModule } from './client-form-routing.module';
import { MaterialModule } from '../../../material/material.module';
import { SecondFormComponent } from './second-form/second-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClientFormRoutingModule,
    MaterialModule
  ],
  declarations: [FirstFormComponent, SecondFormComponent],
  exports: [FirstFormComponent]
})
export class ClientFormModule { }
