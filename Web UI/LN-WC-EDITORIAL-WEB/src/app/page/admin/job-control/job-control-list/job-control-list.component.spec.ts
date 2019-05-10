import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobControlListComponent } from './job-control-list.component';
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
import { JobControlAddDialogComponent } from '../dialogs/job-control-add-dialog/job-control-add-dialog.component';
import { JobControlEditDialogComponent } from '../dialogs/job-control-edit-dialog/job-control-edit-dialog.component';
import { JobControlDeleteDialogComponent } from '../dialogs/job-control-delete-dialog/job-control-delete-dialog.component';
import { JobControlService } from 'src/app/shared/services/admin/job-control/job-control.service';
import { CountryService } from 'src/app/shared/services/admin/country.service';
import { TeamService } from 'src/app/shared/services/admin/team.service';
import { AlertSourceTypeService } from 'src/app/shared/services/admin/job-control/alert-source-type.service';
import { EncodingService } from 'src/app/shared/services/admin/job-control/encoding.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { of } from 'rxjs';

class MockJobControlService extends JobControlService {}
class MockCountryService extends CountryService {}
class MockTeamService extends TeamService {}
class MockAlertSourceTypeService extends AlertSourceTypeService {}
class MockEncodingService extends EncodingService {}

describe('JobControlListComponent', () => {
  let component: JobControlListComponent;
  let fixture: ComponentFixture<JobControlListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
          PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule, MultiSelectModule,
          DialogModule, ToastModule, InputSwitchModule, BrowserAnimationsModule],
      declarations: [ JobControlListComponent, JobControlAddDialogComponent, JobControlEditDialogComponent,
        JobControlDeleteDialogComponent ],
        providers: [
          TeamService, AlertSourceTypeService, EncodingService,
          { provide: JobControlService, useClass: MockJobControlService },
          { provide: CountryService, useClass: MockCountryService },
        ]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(JobControlListComponent);
    component = fixture.componentInstance;

    const jobControlSrv = fixture.debugElement.injector.get(JobControlService);
    spyOn(jobControlSrv, 'getAll').and.returnValue(of ( [] ));

    const countrySrv = fixture.debugElement.injector.get(CountryService);
    spyOn(countrySrv, 'getAll').and.returnValue(of ( [] ));

    const teamSrv = fixture.debugElement.injector.get(TeamService);
    spyOn(teamSrv, 'getAll').and.returnValue(of ( [] ));

    const alertSourceTypeSrv = fixture.debugElement.injector.get(AlertSourceTypeService);
    spyOn(alertSourceTypeSrv, 'getAll').and.returnValue(of ( [] ));

    const encodingSrv = fixture.debugElement.injector.get(EncodingService);
    spyOn(encodingSrv, 'getAll').and.returnValue(of ( [] ));

    fixture.detectChanges();
  }));

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
