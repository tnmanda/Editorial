import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserTeamAssignmentAddDialogComponent } from './app-user-team-assignment-add-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { AppUserTeamAssignmentService } from 'src/app/shared/services/admin/app_user/app-user-team-assignment.service';
import { MessageService } from 'primeng/api';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { TeamService } from 'src/app/shared/services/admin/team.service';
import { AssignmentTypeService } from 'src/app/shared/services/admin/types/assignment-type.service';
import { of } from 'rxjs';
import { InputSwitchModule } from 'primeng/inputswitch';

class MockTeamService extends TeamService {}
class MockAssignmentTypeService extends AssignmentTypeService {}

describe('AppUserTeamAssignmentAddDialogComponent', () => {
  let component: AppUserTeamAssignmentAddDialogComponent;
  let fixture: ComponentFixture<AppUserTeamAssignmentAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, InputTextareaModule, InputSwitchModule,
        DropdownModule, FormsModule],
      declarations: [ AppUserTeamAssignmentAddDialogComponent ],
      providers: [
        GlobalHelperService, AppUserTeamAssignmentService, MessageService,
        { provide: TeamService, useClass: MockTeamService },
        { provide: AssignmentTypeService, useClass: MockAssignmentTypeService },
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserTeamAssignmentAddDialogComponent);
    component = fixture.componentInstance;

    const teamSrv = fixture.debugElement.injector.get(TeamService);
    spyOn(teamSrv, 'getAll').and.returnValue(of ( [] ));

    const assignmentTypeSrv = fixture.debugElement.injector.get(AssignmentTypeService);
    spyOn(assignmentTypeSrv, 'getAll').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
