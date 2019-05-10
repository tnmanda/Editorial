import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserAbsenceDeleteDialogComponent } from './app-user-absence-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { AppUserAbsenceService } from 'src/app/shared/services/admin/app_user/app-user-absence.service';
import { MessageService } from 'primeng/api';

describe('AppUserAbsenceDeleteDialogComponent', () => {
  let component: AppUserAbsenceDeleteDialogComponent;
  let fixture: ComponentFixture<AppUserAbsenceDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ AppUserAbsenceDeleteDialogComponent ],
      providers: [ AppUserAbsenceService, MessageService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserAbsenceDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
