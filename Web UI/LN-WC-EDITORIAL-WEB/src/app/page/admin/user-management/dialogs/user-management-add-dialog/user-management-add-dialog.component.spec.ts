import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementAddDialogComponent } from './user-management-add-dialog.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { OfficeService } from 'src/app/shared/services/admin/office.service';
import { GenderTypeService } from 'src/app/shared/services/admin/types/gender-type.service';
import { OperationalRoleTypeService } from 'src/app/shared/services/admin/operational-role-type.service';
import { AppUserService } from 'src/app/shared/services/admin/app-user.service';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { of } from 'rxjs';

class MockAppUserService extends AppUserService {}
class MockOfficeService extends OfficeService {}
class MockGenderTypeService extends GenderTypeService {}
class MockOperationalRoleTypeService extends OperationalRoleTypeService {}

describe('UserManagementAddDialogComponent', () => {
  let component: UserManagementAddDialogComponent;
  let fixture: ComponentFixture<UserManagementAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, DropdownModule, InputTextModule, ToastModule, MessageModule, InputSwitchModule, FormsModule],
      declarations: [ UserManagementAddDialogComponent ],
      providers: [
        GlobalHelperService, MessageService,
        { provide: AppUserService, useClass: MockAppUserService },
        { provide: OfficeService, useClass: MockOfficeService },
        { provide: GenderTypeService, useClass: MockGenderTypeService },
        { provide: OperationalRoleTypeService, useClass: MockOperationalRoleTypeService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementAddDialogComponent);
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
