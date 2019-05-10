import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementDetailComponent } from './user-management-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { InputSwitchModule } from 'primeng/inputswitch';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppUserService } from 'src/app/shared/services/admin/app-user.service';
import { AppUserAbsenceService } from 'src/app/shared/services/admin/app_user/app-user-absence.service';
import { AppUserAddressService } from 'src/app/shared/services/admin/app_user/app-user-address.service';
import { AppUserCertificateService } from 'src/app/shared/services/admin/app_user/app-user-certificate.service';
import { AppUserContactService } from 'src/app/shared/services/admin/app_user/app-user-contact.service';
import { AppUserContractService } from 'src/app/shared/services/admin/app_user/app-user-contract.service';
import { AppUserCountryService } from 'src/app/shared/services/admin/app_user/app-user-country.service';
import { AppUserEducationService } from 'src/app/shared/services/admin/app_user/app-user-education.service';
import { AppUserEmploymentRecordService } from 'src/app/shared/services/admin/app_user/app-user-employment-record.service';
import { AppUserFunctionService } from 'src/app/shared/services/admin/app_user/app-user-function.service';
import { AppUserInRoleService } from 'src/app/shared/services/admin/app_user/app-user-in-role.service';
import { AppUserLanguageService } from 'src/app/shared/services/admin/app_user/app-user-language.service';
import { AppUserNoteService } from 'src/app/shared/services/admin/app_user/app-user-note.service';
import { AppUserResearchTeamService } from 'src/app/shared/services/admin/app_user/app-user-research-team.service';
import { AppUserTeamAssignmentService } from 'src/app/shared/services/admin/app_user/app-user-team-assignment.service';
import { AppUserTeamService } from 'src/app/shared/services/admin/app_user/app-user-team.service';
// tslint:disable-next-line:max-line-length
import { AppUserAbsenceAddDialogComponent } from '../dialogs/app-user-absence/app-user-absence-add-dialog/app-user-absence-add-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserAbsenceDeleteDialogComponent } from '../dialogs/app-user-absence/app-user-absence-delete-dialog/app-user-absence-delete-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserAddressAddDialogComponent } from '../dialogs/app-user-address/app-user-address-add-dialog/app-user-address-add-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserAddressDeleteDialogComponent } from '../dialogs/app-user-address/app-user-address-delete-dialog/app-user-address-delete-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserCertificateAddDialogComponent } from '../dialogs/app-user-certificate/app-user-certificate-add-dialog/app-user-certificate-add-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserCertificateDeleteDialogComponent } from '../dialogs/app-user-certificate/app-user-certificate-delete-dialog/app-user-certificate-delete-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserContactAddDialogComponent } from '../dialogs/app-user-contact/app-user-contact-add-dialog/app-user-contact-add-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserContactDeleteDialogComponent } from '../dialogs/app-user-contact/app-user-contact-delete-dialog/app-user-contact-delete-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserContractAddDialogComponent } from '../dialogs/app-user-contract/app-user-contract-add-dialog/app-user-contract-add-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserCountryDeleteDialogComponent } from '../dialogs/app-user-country/app-user-country-delete-dialog/app-user-country-delete-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserCountryAddDialogComponent } from '../dialogs/app-user-country/app-user-country-add-dialog/app-user-country-add-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserEducationAddDialogComponent } from '../dialogs/app-user-education/app-user-education-add-dialog/app-user-education-add-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserEducationDeleteDialogComponent } from '../dialogs/app-user-education/app-user-education-delete-dialog/app-user-education-delete-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserEmploymentRecordAddDialogComponent } from '../dialogs/app-user-employment-record/app-user-employment-record-add-dialog/app-user-employment-record-add-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserEmploymentRecordDeleteDialogComponent } from '../dialogs/app-user-employment-record/app-user-employment-record-delete-dialog/app-user-employment-record-delete-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserFunctionAddDialogComponent } from '../dialogs/app-user-function/app-user-function-add-dialog/app-user-function-add-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserFunctionDeleteDialogComponent } from '../dialogs/app-user-function/app-user-function-delete-dialog/app-user-function-delete-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserInRoleAddDialogComponent } from '../dialogs/app-user-in-role/app-user-in-role-add-dialog/app-user-in-role-add-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserInRoleDeleteDialogComponent } from '../dialogs/app-user-in-role/app-user-in-role-delete-dialog/app-user-in-role-delete-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserLanguageAddDialogComponent } from '../dialogs/app-user-language/app-user-language-add-dialog/app-user-language-add-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserLanguageDeleteDialogComponent } from '../dialogs/app-user-language/app-user-language-delete-dialog/app-user-language-delete-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserNoteAddDialogComponent } from '../dialogs/app-user-note/app-user-note-add-dialog/app-user-note-add-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserNoteDeleteDialogComponent } from '../dialogs/app-user-note/app-user-note-delete-dialog/app-user-note-delete-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserContractDeleteDialogComponent } from '../dialogs/app-user-contract/app-user-contract-delete-dialog/app-user-contract-delete-dialog.component';
import { CalendarModule } from 'primeng/calendar';
import { of } from 'rxjs';
import { AppUserTeamAddDialogComponent } from '../dialogs/app-user-team/app-user-team-add-dialog/app-user-team-add-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserTeamDeleteDialogComponent } from '../dialogs/app-user-team/app-user-team-delete-dialog/app-user-team-delete-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserResearchTeamAddDialogComponent } from '../dialogs/app-user-research-team/app-user-research-team-add-dialog/app-user-research-team-add-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserResearchTeamDeleteDialogComponent } from '../dialogs/app-user-research-team/app-user-research-team-delete-dialog/app-user-research-team-delete-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserTeamAssignmentAddDialogComponent } from '../dialogs/app-user-team-assignment/app-user-team-assignment-add-dialog/app-user-team-assignment-add-dialog.component';
// tslint:disable-next-line:max-line-length
import { AppUserTeamAssignmentDeleteDialogComponent } from '../dialogs/app-user-team-assignment/app-user-team-assignment-delete-dialog/app-user-team-assignment-delete-dialog.component';

class MockAppUserService extends AppUserService {}
class MockAppUserAbsenceService extends AppUserAbsenceService {}
class MockAppUserAddressService extends AppUserAddressService {}
class MockAppUserCertificateService extends AppUserCertificateService {}
class MockAppUserContactService extends AppUserContactService {}
class MockAppUserContractService extends AppUserContractService {}
class MockAppUserCountryService extends AppUserCountryService {}
class MockAppUserEducationService extends AppUserEducationService {}
class MockAppUserEmploymentRecordService extends AppUserEmploymentRecordService {}
class MockAppUserFunctionService extends AppUserFunctionService {}
class MockAppUserInRoleService extends AppUserInRoleService {}
class MockAppUserLanguageService extends AppUserLanguageService {}
class MockAppUserNoteService extends AppUserNoteService {}
class MockAppUserResearchTeamService extends AppUserResearchTeamService {}
class MockAppUserTeamAssignmentService extends AppUserTeamAssignmentService {}
class MockAppUserTeamService extends AppUserTeamService {}

describe('UserManagementDetailComponent', () => {
  let component: UserManagementDetailComponent;
  let fixture: ComponentFixture<UserManagementDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule, CalendarModule,
        DialogModule, ToastModule, InputSwitchModule, BrowserAnimationsModule],
      declarations: [ UserManagementDetailComponent, AppUserAbsenceAddDialogComponent, AppUserAbsenceDeleteDialogComponent,
      AppUserAddressAddDialogComponent, AppUserAddressDeleteDialogComponent, AppUserCertificateAddDialogComponent,
      AppUserCertificateDeleteDialogComponent, AppUserContactAddDialogComponent, AppUserContactDeleteDialogComponent,
      AppUserContractAddDialogComponent, AppUserContractDeleteDialogComponent, AppUserCountryAddDialogComponent,
      AppUserCountryDeleteDialogComponent, AppUserEducationAddDialogComponent, AppUserEducationDeleteDialogComponent,
      AppUserEmploymentRecordAddDialogComponent, AppUserEmploymentRecordDeleteDialogComponent, AppUserFunctionAddDialogComponent,
      AppUserFunctionDeleteDialogComponent, AppUserInRoleAddDialogComponent, AppUserInRoleDeleteDialogComponent,
      AppUserLanguageAddDialogComponent, AppUserLanguageDeleteDialogComponent, AppUserNoteAddDialogComponent,
      AppUserNoteDeleteDialogComponent, AppUserTeamAddDialogComponent, AppUserTeamDeleteDialogComponent,
      AppUserResearchTeamAddDialogComponent, AppUserResearchTeamDeleteDialogComponent,  AppUserTeamAssignmentAddDialogComponent,
      AppUserTeamAssignmentDeleteDialogComponent
    ],
      providers: [
        { provide: AppUserService, useClass: MockAppUserService },
        { provide: AppUserAbsenceService, useClass: MockAppUserAbsenceService },
        { provide: AppUserAddressService, useClass: MockAppUserAddressService },
        { provide: AppUserCertificateService, useClass: MockAppUserCertificateService },
        { provide: AppUserContactService, useClass: MockAppUserContactService },
        { provide: AppUserContractService, useClass: MockAppUserContractService },
        { provide: AppUserCountryService, useClass: MockAppUserCountryService },
        { provide: AppUserEducationService, useClass: MockAppUserEducationService },
        { provide: AppUserEmploymentRecordService, useClass: MockAppUserEmploymentRecordService },
        { provide: AppUserFunctionService, useClass: MockAppUserFunctionService },
        { provide: AppUserInRoleService, useClass: MockAppUserInRoleService },
        { provide: AppUserLanguageService, useClass: MockAppUserLanguageService },
        { provide: AppUserNoteService, useClass: MockAppUserNoteService },
        { provide: AppUserResearchTeamService, useClass: MockAppUserResearchTeamService },
        { provide: AppUserTeamAssignmentService, useClass: MockAppUserTeamAssignmentService },
        { provide: AppUserTeamService, useClass: MockAppUserTeamService },
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementDetailComponent);
    component = fixture.componentInstance;

    const appUserSrv = fixture.debugElement.injector.get(AppUserService);
    spyOn(appUserSrv, 'getAll').and.returnValue(of ( [] ));

    const appUserAbsenceSrv = fixture.debugElement.injector.get(AppUserAbsenceService);
    spyOn(appUserAbsenceSrv, 'getByAppUserId').and.returnValue(of ( [] ));

    const appUserAddressSrv = fixture.debugElement.injector.get(AppUserAddressService);
    spyOn(appUserAddressSrv, 'getByAppUserId').and.returnValue(of ( [] ));

    const appUserCertificateSrv = fixture.debugElement.injector.get(AppUserCertificateService);
    spyOn(appUserCertificateSrv, 'getByAppUserId').and.returnValue(of ( [] ));

    const appUserContactSrv = fixture.debugElement.injector.get(AppUserContactService);
    spyOn(appUserContactSrv, 'getByAppUserId').and.returnValue(of ( [] ));

    const appUserContractSrv = fixture.debugElement.injector.get(AppUserContractService);
    spyOn(appUserContractSrv, 'getByAppUserId').and.returnValue(of ( [] ));

    const appUserCountrySrv = fixture.debugElement.injector.get(AppUserCountryService);
    spyOn(appUserCountrySrv, 'getByAppUserId').and.returnValue(of ( [] ));

    const appUserEducationSrv = fixture.debugElement.injector.get(AppUserEducationService);
    spyOn(appUserEducationSrv, 'getByAppUserId').and.returnValue(of ( [] ));

    const appUserEmploymentRecordSrv = fixture.debugElement.injector.get(AppUserEmploymentRecordService);
    spyOn(appUserEmploymentRecordSrv, 'getByAppUserId').and.returnValue(of ( [] ));

    const appUserFunctionSrv = fixture.debugElement.injector.get(AppUserFunctionService);
    spyOn(appUserFunctionSrv, 'getByAppUserId').and.returnValue(of ( [] ));

    const appUserInRoleSrv = fixture.debugElement.injector.get(AppUserInRoleService);
    spyOn(appUserInRoleSrv, 'getByAppUserId').and.returnValue(of ( [] ));

    const appUserLanguageSrv = fixture.debugElement.injector.get(AppUserLanguageService);
    spyOn(appUserLanguageSrv, 'getByAppUserId').and.returnValue(of ( [] ));

    const appUserNoteSrv = fixture.debugElement.injector.get(AppUserNoteService);
    spyOn(appUserNoteSrv, 'getByAppUserId').and.returnValue(of ( [] ));

    const appUserResearchTeamSrv = fixture.debugElement.injector.get(AppUserResearchTeamService);
    spyOn(appUserResearchTeamSrv, 'getByAppUserId').and.returnValue(of ( [] ));

    const appUserTeamAssigmentSrv = fixture.debugElement.injector.get(AppUserTeamAssignmentService);
    spyOn(appUserTeamAssigmentSrv, 'getByAppUserId').and.returnValue(of ( [] ));

    const appUserTeamSrv = fixture.debugElement.injector.get(AppUserTeamService);
    spyOn(appUserTeamSrv, 'getByAppUserId').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
