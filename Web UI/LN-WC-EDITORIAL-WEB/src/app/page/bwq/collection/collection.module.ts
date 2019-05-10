import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CollectionRoutingModule } from './collection-routing.module';

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

import { CollectionListComponent } from './collection-list/collection-list.component';
import { CollectionAddDialogComponent } from './dialogs/collection-add-dialog/collection-add-dialog.component';
import { CollectionEditDialogComponent } from './dialogs/collection-edit-dialog/collection-edit-dialog.component';
import { CollectionDeleteDialogComponent } from './dialogs/collection-delete-dialog/collection-delete-dialog.component';
import { CollectionDetailComponent } from './collection-detail/collection-detail.component';
import { CollectionItemAddDialogComponent } from './dialogs/collection-item-add-dialog/collection-item-add-dialog.component';
import { CollectionItemEditDialogComponent } from './dialogs/collection-item-edit-dialog/collection-item-edit-dialog.component';
import { CollectionItemDeleteDialogComponent } from './dialogs/collection-item-delete-dialog/collection-item-delete-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    CollectionRoutingModule,
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
    CollectionListComponent,
    CollectionAddDialogComponent,
    CollectionEditDialogComponent,
    CollectionDeleteDialogComponent,
    CollectionDetailComponent,
    CollectionItemAddDialogComponent,
    CollectionItemEditDialogComponent,
    CollectionItemDeleteDialogComponent,
  ]
})
export class CollectionModule { }
