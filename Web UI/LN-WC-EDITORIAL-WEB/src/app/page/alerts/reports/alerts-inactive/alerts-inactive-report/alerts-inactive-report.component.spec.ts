import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsInactiveReportComponent } from './alerts-inactive-report.component';
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
import { CountryService } from 'src/app/shared/services/admin/country.service';
import { of } from 'rxjs';

class MockAlertsReportService extends AlertsReportService {}
class MockCountryService extends CountryService {}

describe('AlertsInactiveReportComponent', () => {
  let component: AlertsInactiveReportComponent;
  let fixture: ComponentFixture<AlertsInactiveReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule,
        DialogModule, ToastModule, BrowserAnimationsModule],
      declarations: [ AlertsInactiveReportComponent ],
      providers: [
        CountryService,
        { provide: AlertsReportService, useClass: MockAlertsReportService },
     ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsInactiveReportComponent);
    component = fixture.componentInstance;

    const alertsReportSrv = fixture.debugElement.injector.get(AlertsReportService);
    spyOn(alertsReportSrv, 'getInActiveReport').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
