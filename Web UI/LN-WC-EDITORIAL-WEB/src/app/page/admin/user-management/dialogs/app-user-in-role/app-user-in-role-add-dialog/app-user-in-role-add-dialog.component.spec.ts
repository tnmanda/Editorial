import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserInRoleAddDialogComponent } from './app-user-in-role-add-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { AppUserInRoleService } from 'src/app/shared/services/admin/app_user/app-user-in-role.service';
import { RoleTypeService } from 'src/app/shared/services/admin/types/role-type.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

class MockRoleTypeService extends RoleTypeService {}

describe('AppUserInRoleAddDialogComponent', () => {
  let component: AppUserInRoleAddDialogComponent;
  let fixture: ComponentFixture<AppUserInRoleAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, DropdownModule, FormsModule],
      declarations: [ AppUserInRoleAddDialogComponent ],
      providers: [
        GlobalHelperService, AppUserInRoleService, MessageService,
        { provide: RoleTypeService, useClass: MockRoleTypeService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserInRoleAddDialogComponent);
    component = fixture.componentInstance;

    const roleTypeSrv = fixture.debugElement.injector.get(RoleTypeService);
    spyOn(roleTypeSrv, 'getAll').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
