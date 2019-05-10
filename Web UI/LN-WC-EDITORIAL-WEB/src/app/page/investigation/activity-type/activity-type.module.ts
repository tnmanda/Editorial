import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ActivityTypeRoutingModule } from './activity-type-routing.module';
import { ActivityTypeListComponent } from './activity-type-list/activity-type-list.component';
import { ActivityTypeAddDialogComponent } from './dialogs/activity-type-add-dialog/activity-type-add-dialog.component';
import { ActivityTypeEditDialogComponent } from './dialogs/activity-type-edit-dialog/activity-type-edit-dialog.component';
import { ActivityTypeDeleteDialogComponent } from './dialogs/activity-type-delete-dialog/activity-type-delete-dialog.component';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToastModule } from 'primeng/toast';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TabMenuModule } from 'primeng/tabmenu';
import { SidebarModule } from 'primeng/sidebar';
import { DataViewModule } from 'primeng/dataview';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { TreeModule } from 'primeng/tree';
import { CalendarModule } from 'primeng/calendar';
import { PickListModule } from 'primeng/picklist';
import { TooltipModule } from 'primeng/tooltip';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  imports: [
    CommonModule,
    ActivityTypeRoutingModule,
    ReactiveFormsModule,

    // Prime NG Components
    CardModule,
    InputTextModule,
    PanelModule,
    ButtonModule,
    CheckboxModule,
    BreadcrumbModule,
    PaginatorModule,
    TableModule,
    DialogModule,
    FileUploadModule,
    DropdownModule,
    InputSwitchModule,
    ToastModule,
    InputTextareaModule,
    TabMenuModule,
    SidebarModule,
    DataViewModule,
    TooltipModule,
    ProgressBarModule,
    MessageModule,
    MessagesModule,
    AccordionModule,
    MultiSelectModule,
    TreeModule,
    CalendarModule,
    PickListModule,
  ],
  declarations: [
    ActivityTypeListComponent,
    ActivityTypeAddDialogComponent,
    ActivityTypeEditDialogComponent,
    ActivityTypeDeleteDialogComponent,
  ]
})
export class ActivityTypeModule { }
