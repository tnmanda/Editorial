import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { WatchManagementRoutingModule } from './watch-management-routing.module';
import { WatchListComponent } from './watch-list/watch-list.component';
import { WatchKeywordListComponent } from './watch-keyword-list/watch-keyword-list.component';
import { WatchAddDialogComponent } from './dialogs/watch-add-dialog/watch-add-dialog.component';
import { WatchEditDialogComponent } from './dialogs/watch-edit-dialog/watch-edit-dialog.component';
import { WatchDeleteDialogComponent } from './dialogs/watch-delete-dialog/watch-delete-dialog.component';
import { WatchKeywordAddDialogComponent } from './dialogs/watch-keyword-add-dialog/watch-keyword-add-dialog.component';
import { WatchKeywordEditDialogComponent } from './dialogs/watch-keyword-edit-dialog/watch-keyword-edit-dialog.component';
import { WatchKeywordDeleteDialogComponent } from './dialogs/watch-keyword-delete-dialog/watch-keyword-delete-dialog.component';

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
import { TooltipModule, AccordionModule } from 'ngx-bootstrap';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { TreeModule } from 'primeng/tree';
import { CalendarModule } from 'primeng/calendar';
import { PickListModule } from 'primeng/picklist';

@NgModule({
  imports: [
    CommonModule,
    WatchManagementRoutingModule,
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
  declarations: [WatchListComponent,
                 WatchKeywordListComponent,
                 WatchAddDialogComponent,
                 WatchEditDialogComponent,
                 WatchDeleteDialogComponent,
                 WatchKeywordAddDialogComponent,
                 WatchKeywordEditDialogComponent,
                 WatchKeywordDeleteDialogComponent]
})
export class WatchManagementModule { }
