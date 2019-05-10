import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobControlDeleteDialogComponent } from './job-control-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { JobControlService } from 'src/app/shared/services/admin/job-control/job-control.service';
import { MessageService } from 'primeng/api';

describe('JobControlDeleteDialogComponent', () => {
  let component: JobControlDeleteDialogComponent;
  let fixture: ComponentFixture<JobControlDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ JobControlDeleteDialogComponent ],
      providers: [JobControlService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobControlDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
