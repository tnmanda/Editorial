import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleManagementDetailComponent } from './role-management-detail.component';
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
import { RoleTypeService } from 'src/app/shared/services/admin/types/role-type.service';
import { PageInUserRoleService } from 'src/app/shared/services/admin/page-in-user-role.service';
import { PageInRoleAddDialogComponent } from '../dialogs/page-in-role-add-dialog/page-in-role-add-dialog.component';
import { PageInRoleDeleteDialogComponent } from '../dialogs/page-in-role-delete-dialog/page-in-role-delete-dialog.component';
import { of } from 'rxjs';

class MockRoleTypeService extends RoleTypeService {}
class MockPageInUserRoleService extends PageInUserRoleService {}

describe('RoleManagementDetailComponent', () => {
  let component: RoleManagementDetailComponent;
  let fixture: ComponentFixture<RoleManagementDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule,
        DialogModule, ToastModule, InputSwitchModule, BrowserAnimationsModule],
      declarations: [ RoleManagementDetailComponent, PageInRoleAddDialogComponent, PageInRoleDeleteDialogComponent ],
      providers: [
        { provide: RoleTypeService, useClass: MockRoleTypeService },
        { provide: PageInUserRoleService, useClass: MockPageInUserRoleService },
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleManagementDetailComponent);
    component = fixture.componentInstance;

    const roleTypeSrv = fixture.debugElement.injector.get(RoleTypeService);
    spyOn(roleTypeSrv, 'getAll').and.returnValue(of ( [] ));

    const pageInUserRoleSrv = fixture.debugElement.injector.get(PageInUserRoleService);
    spyOn(pageInUserRoleSrv, 'getByRoleID').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
