import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserTeamAssignmentDeleteDialogComponent } from './app-user-team-assignment-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { AppUserTeamAssignmentService } from 'src/app/shared/services/admin/app_user/app-user-team-assignment.service';
import { MessageService } from 'primeng/api';

describe('AppUserTeamAssignmentDeleteDialogComponent', () => {
  let component: AppUserTeamAssignmentDeleteDialogComponent;
  let fixture: ComponentFixture<AppUserTeamAssignmentDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ AppUserTeamAssignmentDeleteDialogComponent ],
      providers: [ AppUserTeamAssignmentService, MessageService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserTeamAssignmentDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
