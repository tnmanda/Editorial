import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsPastDueReportComponent } from './alerts-past-due-report.component';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertsReportService } from 'src/app/shared/services/alerts/alerts-report.service';
import { of } from 'rxjs';

class MockAlertsReportService extends AlertsReportService {}

describe('AlertsPastDueReportComponent', () => {
  let component: AlertsPastDueReportComponent;
  let fixture: ComponentFixture<AlertsPastDueReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule,
        DialogModule, ToastModule, BrowserAnimationsModule],
      declarations: [ AlertsPastDueReportComponent ],
      providers: [
                  { provide: AlertsReportService, useClass: MockAlertsReportService },
              ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsPastDueReportComponent);
    component = fixture.componentInstance;

    const alertsReportSrv = fixture.debugElement.injector.get(AlertsReportService);
    spyOn(alertsReportSrv, 'getPastDueReport').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
