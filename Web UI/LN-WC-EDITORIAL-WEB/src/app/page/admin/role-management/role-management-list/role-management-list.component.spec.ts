import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleManagementListComponent } from './role-management-list.component';
import { RoleManagementAddDialogComponent } from '../dialogs/role-management-add-dialog/role-management-add-dialog.component';
import { RoleManagementEditDialogComponent } from '../dialogs/role-management-edit-dialog/role-management-edit-dialog.component';
import { RoleManagementDeleteDialogComponent } from '../dialogs/role-management-delete-dialog/role-management-delete-dialog.component';
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
import { of } from 'rxjs';

class MockRoleTypeService extends RoleTypeService {}

describe('RoleManagementListComponent', () => {
  let component: RoleManagementListComponent;
  let fixture: ComponentFixture<RoleManagementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule,
        DialogModule, ToastModule, InputSwitchModule, BrowserAnimationsModule],
      declarations: [ RoleManagementListComponent, RoleManagementAddDialogComponent, RoleManagementEditDialogComponent,
      RoleManagementDeleteDialogComponent ],
      providers: [
        { provide: RoleTypeService, useClass: MockRoleTypeService },
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleManagementListComponent);
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
