import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageManagementListComponent } from './page-management-list.component';
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
import { PageEditDialogComponent } from '../dialogs/page-edit-dialog/page-edit-dialog.component';
import { PageDeleteDialogComponent } from '../dialogs/page-delete-dialog/page-delete-dialog.component';
import { PageAddDialogComponent } from '../dialogs/page-add-dialog/page-add-dialog.component';
import { PageService } from 'src/app/shared/services/admin/page.service';
import { PageGroupService } from 'src/app/shared/services/admin/page-group.service';
import { PageGroupAddDialogComponent } from '../dialogs/page-group-add-dialog/page-group-add-dialog.component';
import { PageGroupEditDialogComponent } from '../dialogs/page-group-edit-dialog/page-group-edit-dialog.component';
import { PageGroupDeleteDialogComponent } from '../dialogs/page-group-delete-dialog/page-group-delete-dialog.component';
import { of } from 'rxjs';

class MockPageService extends PageService {}
class MockPageGroupService extends PageGroupService {}

describe('PageManagementListComponent', () => {
  let component: PageManagementListComponent;
  let fixture: ComponentFixture<PageManagementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule,
        DialogModule, ToastModule, InputSwitchModule, BrowserAnimationsModule],
      declarations: [ PageManagementListComponent, PageAddDialogComponent, PageEditDialogComponent,
      PageDeleteDialogComponent, PageGroupAddDialogComponent, PageGroupEditDialogComponent, PageGroupDeleteDialogComponent ],
      providers: [
        { provide: PageService, useClass: MockPageService },
        { provide: PageGroupService, useClass: MockPageGroupService },
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageManagementListComponent);
    component = fixture.componentInstance;

    const pageSrv = fixture.debugElement.injector.get(PageService);
    spyOn(pageSrv, 'getAll').and.returnValue(of ( [] ));

    const pageGroupSrv = fixture.debugElement.injector.get(PageGroupService);
    spyOn(pageGroupSrv, 'getAll').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
