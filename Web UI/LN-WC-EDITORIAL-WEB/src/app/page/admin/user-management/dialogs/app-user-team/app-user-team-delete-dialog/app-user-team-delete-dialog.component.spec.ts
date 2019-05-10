import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserTeamDeleteDialogComponent } from './app-user-team-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { AppUserTeamService } from 'src/app/shared/services/admin/app_user/app-user-team.service';
import { MessageService } from 'primeng/api';

describe('AppUserTeamDeleteDialogComponent', () => {
  let component: AppUserTeamDeleteDialogComponent;
  let fixture: ComponentFixture<AppUserTeamDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ AppUserTeamDeleteDialogComponent ],
      providers: [ AppUserTeamService, MessageService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserTeamDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
