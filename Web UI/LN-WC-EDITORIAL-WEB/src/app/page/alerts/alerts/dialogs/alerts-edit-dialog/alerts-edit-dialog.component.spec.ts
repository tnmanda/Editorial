import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsEditDialogComponent } from './alerts-edit-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { PickListModule } from 'primeng/picklist';
import { DropdownModule } from 'primeng/dropdown';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { DatePipe } from '@angular/common';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { MessageService } from 'primeng/api';

describe('AlertsEditDialogComponent', () => {
  let component: AlertsEditDialogComponent;
  let fixture: ComponentFixture<AlertsEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, CalendarModule, ButtonModule, PickListModule,
        DropdownModule, FormsModule],
      declarations: [ AlertsEditDialogComponent ],
      providers: [ GlobalHelperService, DatePipe, AlertsService, MessageService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
