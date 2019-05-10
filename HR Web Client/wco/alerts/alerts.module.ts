import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertsRoutingModule } from './alerts-routing.module';
import { AlertsQueueComponent } from './alerts-queue/alerts-queue.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { MatSlideToggleModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    AlertsRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    MatSlideToggleModule
  ],
  declarations: [AlertsQueueComponent]
})
export class AlertsModule { }
