import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkUnitTypeListComponent } from './work-unit-type-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { InputSwitchModule } from 'primeng/inputswitch';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorkUnitTypeService } from 'src/app/shared/services/admin/types/work-unit-type.service';
import { WorkUnitTypeAddDialogComponent } from '../dialogs/work-unit-type-add-dialog/work-unit-type-add-dialog.component';
import { WorkUnitTypeDeleteDialogComponent } from '../dialogs/work-unit-type-delete-dialog/work-unit-type-delete-dialog.component';
import { WorkUnitTypeEditDialogComponent } from '../dialogs/work-unit-type-edit-dialog/work-unit-type-edit-dialog.component';
import { of } from 'rxjs';

class MockWorkUnitTypeService extends WorkUnitTypeService {}

describe('WorkUnitTypeListComponent', () => {
  let component: WorkUnitTypeListComponent;
  let fixture: ComponentFixture<WorkUnitTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule, InputTextareaModule,
        DialogModule, ToastModule, InputSwitchModule, BrowserAnimationsModule],
      declarations: [ WorkUnitTypeListComponent, WorkUnitTypeAddDialogComponent, WorkUnitTypeEditDialogComponent,
      WorkUnitTypeDeleteDialogComponent ],
      providers: [
        { provide: WorkUnitTypeService, useClass: MockWorkUnitTypeService },
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkUnitTypeListComponent);
    component = fixture.componentInstance;

    const workUnitTypeSrv = fixture.debugElement.injector.get(WorkUnitTypeService);
    spyOn(workUnitTypeSrv, 'getAll').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
