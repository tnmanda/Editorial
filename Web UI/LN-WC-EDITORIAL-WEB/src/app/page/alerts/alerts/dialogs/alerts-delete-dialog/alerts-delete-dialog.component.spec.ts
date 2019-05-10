import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsDeleteDialogComponent } from './alerts-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { MessageService } from 'primeng/api';

describe('AlertsDeleteDialogComponent', () => {
  let component: AlertsDeleteDialogComponent;
  let fixture: ComponentFixture<AlertsDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ AlertsDeleteDialogComponent ],
      providers: [AlertsService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
