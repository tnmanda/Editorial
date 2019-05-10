import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserEmploymentRecordDeleteDialogComponent } from './app-user-employment-record-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { AppUserEmploymentRecordService } from 'src/app/shared/services/admin/app_user/app-user-employment-record.service';
import { MessageService } from 'primeng/api';

describe('AppUserEmploymentRecordDeleteDialogComponent', () => {
  let component: AppUserEmploymentRecordDeleteDialogComponent;
  let fixture: ComponentFixture<AppUserEmploymentRecordDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ AppUserEmploymentRecordDeleteDialogComponent ],
      providers: [ AppUserEmploymentRecordService, MessageService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserEmploymentRecordDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
