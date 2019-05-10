import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RoleManagementRoutingModule } from './role-management-routing.module';

// Prime NG Components
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {PaginatorModule} from 'primeng/paginator';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {FileUploadModule} from 'primeng/fileupload';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {ToastModule} from 'primeng/toast';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TabMenuModule} from 'primeng/tabmenu';
import {SidebarModule} from 'primeng/sidebar';
import {DataViewModule} from 'primeng/dataview';
import {TooltipModule} from 'primeng/tooltip';
import {ProgressBarModule} from 'primeng/progressbar';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {AccordionModule} from 'primeng/accordion';
import {MultiSelectModule} from 'primeng/multiselect';
import {TreeModule} from 'primeng/tree';
import {CalendarModule} from 'primeng/calendar';
import {PickListModule} from 'primeng/picklist';

import { RoleManagementListComponent } from './role-management-list/role-management-list.component';
import { RoleManagementEditDialogComponent } from './dialogs/role-management-edit-dialog/role-management-edit-dialog.component';
import { RoleManagementAddDialogComponent } from './dialogs/role-management-add-dialog/role-management-add-dialog.component';
import { RoleManagementDeleteDialogComponent } from './dialogs/role-management-delete-dialog/role-management-delete-dialog.component';
import { RoleManagementDetailComponent } from './role-management-detail/role-management-detail.component';
import { PageInRoleAddDialogComponent } from './dialogs/page-in-role-add-dialog/page-in-role-add-dialog.component';
import { PageInRoleDeleteDialogComponent } from './dialogs/page-in-role-delete-dialog/page-in-role-delete-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    RoleManagementRoutingModule,
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
    RoleManagementListComponent,
    RoleManagementEditDialogComponent,
    RoleManagementAddDialogComponent,
    RoleManagementDeleteDialogComponent,
    RoleManagementDetailComponent,
    PageInRoleAddDialogComponent,
    PageInRoleDeleteDialogComponent,
  ]
})
export class RoleManagementModule { }
