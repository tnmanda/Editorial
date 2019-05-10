import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsManagementComponent } from './alerts-management.component';
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
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { MessageService } from 'primeng/api';
import { TreeModule } from 'primeng/tree';
import { TooltipModule } from 'primeng/tooltip';
import { of } from 'rxjs';

class MockAlertsService extends AlertsService {}

describe('AlertsManagementComponent', () => {
  let component: AlertsManagementComponent;
  let fixture: ComponentFixture<AlertsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule, TooltipModule,
        DialogModule, ToastModule, BrowserAnimationsModule, TreeModule],
      declarations: [ AlertsManagementComponent ],
      providers: [
                    GlobalHelperService, MessageService,
                    { provide: AlertsService, useClass: MockAlertsService },
                 ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsManagementComponent);
    component = fixture.componentInstance;

    const alertsSrv = fixture.debugElement.injector.get(AlertsService);
    spyOn(alertsSrv, 'getNavs').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
