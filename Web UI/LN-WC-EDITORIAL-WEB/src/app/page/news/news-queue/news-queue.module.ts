import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NewsQueueRoutingModule } from './news-queue-routing.module';
import { NewsManagementComponent } from './news-management/news-management.component';

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


@NgModule({
  imports: [
    CommonModule,
    NewsQueueRoutingModule,
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
  declarations: [NewsManagementComponent]
})
export class NewsQueueModule { }
