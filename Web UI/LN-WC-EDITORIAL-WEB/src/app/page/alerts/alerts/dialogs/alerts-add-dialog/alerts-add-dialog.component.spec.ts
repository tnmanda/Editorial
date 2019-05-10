import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsAddDialogComponent } from './alerts-add-dialog.component';
import { CalendarModule } from 'primeng/calendar';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { PickListModule } from 'primeng/picklist';
import { DropdownModule } from 'primeng/dropdown';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { DatePipe } from '@angular/common';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { of } from 'rxjs';

class MockAlertsService extends AlertsService {}

describe('AlertsAddDialogComponent', () => {
  let component: AlertsAddDialogComponent;
  let fixture: ComponentFixture<AlertsAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, CalendarModule, ButtonModule, PickListModule, ToastModule,
        DropdownModule, FormsModule],
      declarations: [ AlertsAddDialogComponent ],
      providers: [
        GlobalHelperService, DatePipe, MessageService,
        { provide: AlertsService, useClass: MockAlertsService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsAddDialogComponent);
    component = fixture.componentInstance;

    const alertsSrv = fixture.debugElement.injector.get(AlertsService);
    spyOn(alertsSrv, 'getAlertJobs').and.returnValue(of ( [] ));
    spyOn(alertsSrv, 'getAlertPriorities').and.returnValue(of ( [] ));
    spyOn(alertsSrv, 'getAlertStatus').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
