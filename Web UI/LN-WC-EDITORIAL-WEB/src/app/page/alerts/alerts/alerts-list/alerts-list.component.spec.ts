import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsListComponent } from './alerts-list.component';
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
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { AlertsAddDialogComponent } from '../dialogs/alerts-add-dialog/alerts-add-dialog.component';
import { AlertsEditDialogComponent } from '../dialogs/alerts-edit-dialog/alerts-edit-dialog.component';
import { AlertsDeleteDialogComponent } from '../dialogs/alerts-delete-dialog/alerts-delete-dialog.component';
import { CalendarModule } from 'primeng/calendar';
import { PickListModule } from 'primeng/picklist';
import { DatePipe } from '@angular/common';
import { of } from 'rxjs';

class MockAlertsService extends AlertsService {}

describe('AlertsListComponent', () => {
  let component: AlertsListComponent;
  let fixture: ComponentFixture<AlertsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule, CalendarModule, PickListModule,
        DialogModule, ToastModule, InputSwitchModule, BrowserAnimationsModule],
      declarations: [ AlertsListComponent, AlertsAddDialogComponent, AlertsEditDialogComponent,
      AlertsDeleteDialogComponent ],
      providers: [
                  { provide: AlertsService, useClass: MockAlertsService },
                  DatePipe
                ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsListComponent);
    component = fixture.componentInstance;

    const alertsSrv = fixture.debugElement.injector.get(AlertsService);
    spyOn(alertsSrv, 'getAlertJobQueues').and.returnValue(of ( [] ));
    spyOn(alertsSrv, 'getAlertJobs').and.returnValue(of ( [] ));
    spyOn(alertsSrv, 'getAlertPriorities').and.returnValue(of ( [] ));
    spyOn(alertsSrv, 'getAlertStatus').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
