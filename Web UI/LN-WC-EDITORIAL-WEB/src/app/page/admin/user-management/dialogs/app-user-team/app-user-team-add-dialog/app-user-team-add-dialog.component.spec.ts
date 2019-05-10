import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserTeamAddDialogComponent } from './app-user-team-add-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { TeamService } from 'src/app/shared/services/admin/team.service';
import { AppUserTeamService } from 'src/app/shared/services/admin/app_user/app-user-team.service';
import { MessageService } from 'primeng/api';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { of } from 'rxjs';

class MockTeamService extends TeamService {}

describe('AppUserTeamAddDialogComponent', () => {
  let component: AppUserTeamAddDialogComponent;
  let fixture: ComponentFixture<AppUserTeamAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, InputTextareaModule,
        DropdownModule, FormsModule],
      declarations: [ AppUserTeamAddDialogComponent ],
      providers: [
        GlobalHelperService, AppUserTeamService, MessageService,
        { provide: TeamService, useClass: MockTeamService },
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserTeamAddDialogComponent);
    component = fixture.componentInstance;

    const teamSrv = fixture.debugElement.injector.get(TeamService);
    spyOn(teamSrv, 'getAll').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
