import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkUnitDurationListComponent } from './work-unit-duration-list.component';
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
import { WorkUnitDurationService } from 'src/app/shared/services/admin/work-unit-duration.service';
import { WorkUnitDurationAddDialogComponent } from '../dialogs/work-unit-duration-add-dialog/work-unit-duration-add-dialog.component';
import { WorkUnitDurationEditDialogComponent } from '../dialogs/work-unit-duration-edit-dialog/work-unit-duration-edit-dialog.component';
// tslint:disable-next-line:max-line-length
import { WorkUnitDurationDeleteDialogComponent } from '../dialogs/work-unit-duration-delete-dialog/work-unit-duration-delete-dialog.component';
import { of } from 'rxjs';
import { WorkUnitTypeService } from 'src/app/shared/services/admin/types/work-unit-type.service';

class MockWorkUnitDurationService extends WorkUnitDurationService {}
class MockWorkUnitTypeService extends WorkUnitTypeService {}

describe('WorkUnitDurationListComponent', () => {
  let component: WorkUnitDurationListComponent;
  let fixture: ComponentFixture<WorkUnitDurationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule,
        DialogModule, ToastModule, InputSwitchModule, BrowserAnimationsModule],
      declarations: [ WorkUnitDurationListComponent, WorkUnitDurationAddDialogComponent, WorkUnitDurationEditDialogComponent,
      WorkUnitDurationDeleteDialogComponent ],
      providers: [
        { provide: WorkUnitDurationService, useClass: MockWorkUnitDurationService },
        { provide: WorkUnitTypeService, useClass: MockWorkUnitTypeService },
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkUnitDurationListComponent);
    component = fixture.componentInstance;

    const workUnitDurationSrv = fixture.debugElement.injector.get(WorkUnitDurationService);
    spyOn(workUnitDurationSrv, 'getAll').and.returnValue(of ( [] ));

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
