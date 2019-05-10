import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { NewsQueueComponent } from './news-queue/news-queue.component';
import { MatSlideToggleModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    NewsRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    MatSlideToggleModule
  ],
  declarations: [NewsQueueComponent]
})
export class NewsModule { }
