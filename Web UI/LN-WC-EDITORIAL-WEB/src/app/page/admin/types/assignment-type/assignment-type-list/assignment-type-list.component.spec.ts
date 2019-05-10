import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentTypeListComponent } from './assignment-type-list.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
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
import { AssignmentTypeService } from 'src/app/shared/services/admin/types/assignment-type.service';
import { AssignmentTypeAddDialogComponent } from '../dialogs/assignment-type-add-dialog/assignment-type-add-dialog.component';
import { AssignmentTypeEditDialogComponent } from '../dialogs/assignment-type-edit-dialog/assignment-type-edit-dialog.component';
import { AssignmentTypeDeleteDialogComponent } from '../dialogs/assignment-type-delete-dialog/assignment-type-delete-dialog.component';
import { of } from 'rxjs';

class MockAssignmentTypeService extends AssignmentTypeService {}

describe('AssignmentTypeListComponent', () => {
  let component: AssignmentTypeListComponent;
  let fixture: ComponentFixture<AssignmentTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule, InputTextareaModule,
        DialogModule, ToastModule, InputSwitchModule, BrowserAnimationsModule],
      declarations: [ AssignmentTypeListComponent, AssignmentTypeAddDialogComponent, AssignmentTypeEditDialogComponent,
      AssignmentTypeDeleteDialogComponent ],
      providers: [
        { provide: AssignmentTypeService, useClass: MockAssignmentTypeService },
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentTypeListComponent);
    component = fixture.componentInstance;

    const assignmentTypeSrv = fixture.debugElement.injector.get(AssignmentTypeService);
    spyOn(assignmentTypeSrv, 'getAll').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
