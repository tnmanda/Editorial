import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserManagementRoutingModule } from './user-management-routing.module';

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


import { UserManagementListComponent } from './user-management-list/user-management-list.component';
import { UserManagementDetailComponent } from './user-management-detail/user-management-detail.component';
import { UserManagementEditDialogComponent } from './dialogs/user-management-edit-dialog/user-management-edit-dialog.component';
import { UserManagementAddDialogComponent } from './dialogs/user-management-add-dialog/user-management-add-dialog.component';
import { UserManagementDeleteDialogComponent } from './dialogs/user-management-delete-dialog/user-management-delete-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserAbsenceAddDialogComponent } from './dialogs/app-user-absence/app-user-absence-add-dialog/app-user-absence-add-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserAbsenceDeleteDialogComponent } from './dialogs/app-user-absence/app-user-absence-delete-dialog/app-user-absence-delete-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserAddressAddDialogComponent } from './dialogs/app-user-address/app-user-address-add-dialog/app-user-address-add-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserAddressDeleteDialogComponent } from './dialogs/app-user-address/app-user-address-delete-dialog/app-user-address-delete-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserCertificateAddDialogComponent } from './dialogs/app-user-certificate/app-user-certificate-add-dialog/app-user-certificate-add-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserCertificateDeleteDialogComponent } from './dialogs/app-user-certificate/app-user-certificate-delete-dialog/app-user-certificate-delete-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserInRoleAddDialogComponent } from './dialogs/app-user-in-role/app-user-in-role-add-dialog/app-user-in-role-add-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserInRoleDeleteDialogComponent } from './dialogs/app-user-in-role/app-user-in-role-delete-dialog/app-user-in-role-delete-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserContactAddDialogComponent } from './dialogs/app-user-contact/app-user-contact-add-dialog/app-user-contact-add-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserContactDeleteDialogComponent } from './dialogs/app-user-contact/app-user-contact-delete-dialog/app-user-contact-delete-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserContractAddDialogComponent } from './dialogs/app-user-contract/app-user-contract-add-dialog/app-user-contract-add-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserContractDeleteDialogComponent } from './dialogs/app-user-contract/app-user-contract-delete-dialog/app-user-contract-delete-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserEducationAddDialogComponent } from './dialogs/app-user-education/app-user-education-add-dialog/app-user-education-add-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserEducationDeleteDialogComponent } from './dialogs/app-user-education/app-user-education-delete-dialog/app-user-education-delete-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserEmploymentRecordAddDialogComponent } from './dialogs/app-user-employment-record/app-user-employment-record-add-dialog/app-user-employment-record-add-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserEmploymentRecordDeleteDialogComponent } from './dialogs/app-user-employment-record/app-user-employment-record-delete-dialog/app-user-employment-record-delete-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserFunctionAddDialogComponent } from './dialogs/app-user-function/app-user-function-add-dialog/app-user-function-add-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserFunctionDeleteDialogComponent } from './dialogs/app-user-function/app-user-function-delete-dialog/app-user-function-delete-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserLanguageAddDialogComponent } from './dialogs/app-user-language/app-user-language-add-dialog/app-user-language-add-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserLanguageDeleteDialogComponent } from './dialogs/app-user-language/app-user-language-delete-dialog/app-user-language-delete-dialog.component';
import { AppUserNoteAddDialogComponent } from './dialogs/app-user-note/app-user-note-add-dialog/app-user-note-add-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserNoteDeleteDialogComponent } from './dialogs/app-user-note/app-user-note-delete-dialog/app-user-note-delete-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserCountryAddDialogComponent } from './dialogs/app-user-country/app-user-country-add-dialog/app-user-country-add-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserCountryDeleteDialogComponent } from './dialogs/app-user-country/app-user-country-delete-dialog/app-user-country-delete-dialog.component';
import { AppUserTeamAddDialogComponent } from './dialogs/app-user-team/app-user-team-add-dialog/app-user-team-add-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserTeamDeleteDialogComponent } from './dialogs/app-user-team/app-user-team-delete-dialog/app-user-team-delete-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserTeamAssignmentAddDialogComponent } from './dialogs/app-user-team-assignment/app-user-team-assignment-add-dialog/app-user-team-assignment-add-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserTeamAssignmentDeleteDialogComponent } from './dialogs/app-user-team-assignment/app-user-team-assignment-delete-dialog/app-user-team-assignment-delete-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserResearchTeamAddDialogComponent } from './dialogs/app-user-research-team/app-user-research-team-add-dialog/app-user-research-team-add-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserResearchTeamDeleteDialogComponent } from './dialogs/app-user-research-team/app-user-research-team-delete-dialog/app-user-research-team-delete-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    UserManagementRoutingModule,
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
    UserManagementListComponent,
    UserManagementDetailComponent,
    UserManagementEditDialogComponent,
    UserManagementAddDialogComponent,
    UserManagementDeleteDialogComponent,
    AppUserAbsenceAddDialogComponent,
    AppUserAbsenceDeleteDialogComponent,
    AppUserAddressAddDialogComponent,
    AppUserAddressDeleteDialogComponent,
    AppUserCertificateAddDialogComponent,
    AppUserCertificateDeleteDialogComponent,
    AppUserInRoleAddDialogComponent,
    AppUserInRoleDeleteDialogComponent,
    AppUserContactAddDialogComponent,
    AppUserContactDeleteDialogComponent,
    AppUserContractAddDialogComponent,
    AppUserContractDeleteDialogComponent,
    AppUserEducationAddDialogComponent,
    AppUserEducationDeleteDialogComponent,
    AppUserEmploymentRecordAddDialogComponent,
    AppUserEmploymentRecordDeleteDialogComponent,
    AppUserFunctionAddDialogComponent,
    AppUserFunctionDeleteDialogComponent,
    AppUserLanguageAddDialogComponent,
    AppUserLanguageDeleteDialogComponent,
    AppUserNoteAddDialogComponent,
    AppUserNoteDeleteDialogComponent,
    AppUserCountryAddDialogComponent,
    AppUserCountryDeleteDialogComponent,
    AppUserTeamAddDialogComponent,
    AppUserTeamDeleteDialogComponent,
    AppUserTeamAssignmentAddDialogComponent,
    AppUserTeamAssignmentDeleteDialogComponent,
    AppUserResearchTeamAddDialogComponent,
    AppUserResearchTeamDeleteDialogComponent,
  ]
})
export class UserManagementModule { }
