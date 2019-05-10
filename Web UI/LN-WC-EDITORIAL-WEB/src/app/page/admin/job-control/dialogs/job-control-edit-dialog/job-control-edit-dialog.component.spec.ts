import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobControlEditDialogComponent } from './job-control-edit-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { JobControlService } from 'src/app/shared/services/admin/job-control/job-control.service';
import { CountryService } from 'src/app/shared/services/admin/country.service';
import { TeamService } from 'src/app/shared/services/admin/team.service';
import { AlertSourceTypeService } from 'src/app/shared/services/admin/job-control/alert-source-type.service';
import { EncodingService } from 'src/app/shared/services/admin/job-control/encoding.service';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { of } from 'rxjs';

class MockCountryService extends CountryService {}
class MockTeamService extends TeamService {}
class MockAlertSourceTypeService extends AlertSourceTypeService {}
class MockEncodingService extends EncodingService {}

describe('JobControlEditDialogComponent', () => {
  let component: JobControlEditDialogComponent;
  let fixture: ComponentFixture<JobControlEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, InputTextModule, InputSwitchModule, ButtonModule, InputTextareaModule, DropdownModule,  FormsModule],
      declarations: [ JobControlEditDialogComponent ],
      providers: [
        GlobalHelperService, MessageService, JobControlService,
        { provide: CountryService, useClass: MockCountryService },
        { provide: TeamService, useClass: MockTeamService },
        { provide: AlertSourceTypeService, useClass: MockAlertSourceTypeService },
        { provide: EncodingService, useClass: MockEncodingService }
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobControlEditDialogComponent);
    component = fixture.componentInstance;

    const countrySrv = fixture.debugElement.injector.get(CountryService);
    spyOn(countrySrv, 'getAll').and.returnValue(of ( [] ));

    const teamSrv = fixture.debugElement.injector.get(TeamService);
    spyOn(teamSrv, 'getAll').and.returnValue(of ( [] ));

    const alertSourceTypeSrv = fixture.debugElement.injector.get(AlertSourceTypeService);
    spyOn(alertSourceTypeSrv, 'getAll').and.returnValue(of ( [] ));

    const encodingSrv = fixture.debugElement.injector.get(EncodingService);
    spyOn(encodingSrv, 'getAll').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
