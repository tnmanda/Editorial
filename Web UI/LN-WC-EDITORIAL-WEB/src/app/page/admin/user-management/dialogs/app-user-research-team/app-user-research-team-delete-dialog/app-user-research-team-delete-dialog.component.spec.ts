import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserResearchTeamDeleteDialogComponent } from './app-user-research-team-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { AppUserResearchTeamService } from 'src/app/shared/services/admin/app_user/app-user-research-team.service';
import { MessageService } from 'primeng/api';

describe('AppUserResearchTeamDeleteDialogComponent', () => {
  let component: AppUserResearchTeamDeleteDialogComponent;
  let fixture: ComponentFixture<AppUserResearchTeamDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ AppUserResearchTeamDeleteDialogComponent ],
      providers: [ AppUserResearchTeamService, MessageService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserResearchTeamDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
