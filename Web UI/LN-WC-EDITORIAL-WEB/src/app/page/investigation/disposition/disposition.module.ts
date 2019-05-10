import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DispositionRoutingModule } from './disposition-routing.module';

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

import { DispositionListComponent } from './disposition-list/disposition-list.component';
import { DispositionAddDialogComponent } from './dialogs/disposition-add-dialog/disposition-add-dialog.component';
import { DispositionEditDialogComponent } from './dialogs/disposition-edit-dialog/disposition-edit-dialog.component';
import { DispositionDeleteDialogComponent } from './dialogs/disposition-delete-dialog/disposition-delete-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    DispositionRoutingModule,
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
    DispositionListComponent,
    DispositionAddDialogComponent,
    DispositionEditDialogComponent,
    DispositionDeleteDialogComponent,
  ]
})
export class DispositionModule { }
