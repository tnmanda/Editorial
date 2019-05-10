import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestigationRoutingModule } from './investigation-routing.module';
import { InvestigationEntityComponent } from './investigation/investigation-entity/investigation-entity.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
// tslint:disable-next-line:max-line-length
import { InvestigationNoteListDialogComponent } from './investigation/dialogs/investigation-note-list-dialog/investigation-note-list-dialog.component';
import { ActivityLogsDialogComponent } from './investigation/dialogs/activity-logs-dialog/activity-logs-dialog.component';
import { SendEmailDialogComponent } from './investigation/dialogs/send-email-dialog/send-email-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    InvestigationRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    MatSlideToggleModule
  ],
  declarations: [InvestigationEntityComponent, InvestigationNoteListDialogComponent, ActivityLogsDialogComponent, SendEmailDialogComponent],
  entryComponents: [InvestigationNoteListDialogComponent, ActivityLogsDialogComponent, SendEmailDialogComponent]
})
export class InvestigationModule { }
