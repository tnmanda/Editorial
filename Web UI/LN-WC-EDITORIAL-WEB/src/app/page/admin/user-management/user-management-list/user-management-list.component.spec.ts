import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementListComponent } from './user-management-list.component';
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
import { UserManagementAddDialogComponent } from '../dialogs/user-management-add-dialog/user-management-add-dialog.component';
import { UserManagementEditDialogComponent } from '../dialogs/user-management-edit-dialog/user-management-edit-dialog.component';
import { UserManagementDeleteDialogComponent } from '../dialogs/user-management-delete-dialog/user-management-delete-dialog.component';
import { OfficeService } from 'src/app/shared/services/admin/office.service';
import { GenderTypeService } from 'src/app/shared/services/admin/types/gender-type.service';
import { OperationalRoleTypeService } from 'src/app/shared/services/admin/operational-role-type.service';
import { of } from 'rxjs';

class MockAppUserService extends AppUserService {}
class MockOfficeService extends OfficeService {}
class MockGenderTypeService extends GenderTypeService {}
class MockOperationalRoleTypeService extends OperationalRoleTypeService {}

describe('UserManagementListComponent', () => {
  let component: UserManagementListComponent;
  let fixture: ComponentFixture<UserManagementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule,
        DialogModule, ToastModule, InputSwitchModule, BrowserAnimationsModule],
      declarations: [ UserManagementListComponent, UserManagementAddDialogComponent, UserManagementEditDialogComponent,
      UserManagementDeleteDialogComponent ],
      providers: [
        { provide: AppUserService, useClass: MockAppUserService },
        { provide: OfficeService, useClass: MockOfficeService },
        { provide: GenderTypeService, useClass: MockGenderTypeService },
        { provide: OperationalRoleTypeService, useClass: MockOperationalRoleTypeService },
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementListComponent);
    component = fixture.componentInstance;

    const appUserSrv = fixture.debugElement.injector.get(AppUserService);
    spyOn(appUserSrv, 'getAll').and.returnValue(of ( [] ));

    const officeSrv = fixture.debugElement.injector.get(OfficeService);
    spyOn(officeSrv, 'getAll').and.returnValue(of ( [] ));

    const genderTypeSrv = fixture.debugElement.injector.get(GenderTypeService);
    spyOn(genderTypeSrv, 'getAll').and.returnValue(of ( [] ));

    const operationalRoleTypeSrv = fixture.debugElement.injector.get(OperationalRoleTypeService);
    spyOn(operationalRoleTypeSrv, 'getAll').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
