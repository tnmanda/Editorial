import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { AppUser } from 'src/app/shared/models/admin/app-user.model';
import { AppUserTeamAssignment } from 'src/app/shared/models/admin/app_user/app-user-team-assignment.model';
import { Subscription } from 'rxjs';
import { Team } from 'src/app/shared/models/admin/team.model';
import { AssignmentType } from 'src/app/shared/models/admin/types/assignment-type.model';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { AppUserTeamAssignmentService } from 'src/app/shared/services/admin/app_user/app-user-team-assignment.service';
import { TeamService } from 'src/app/shared/services/admin/team.service';
import { AssignmentTypeService } from 'src/app/shared/services/admin/types/assignment-type.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-app-user-team-assignment-add-dialog',
  templateUrl: './app-user-team-assignment-add-dialog.component.html',
  styleUrls: ['./app-user-team-assignment-add-dialog.component.css']
})
export class AppUserTeamAssignmentAddDialogComponent implements OnInit, OnDestroy {

  @Input() selectedAppUser: AppUser;

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  appUserTeamAssignment: AppUserTeamAssignment;
  appUserTeamAssignmentAddSubscription: Subscription;
  teamAllSubscription: Subscription;
  assignmentTypeAllSubscription: Subscription;

  teams: Team[];
  assignmentTypes: AssignmentType[];

  errorMessage: string;

  constructor(private globalHelperSrv: GlobalHelperService,
              private appUserTeamAssignmentSrv: AppUserTeamAssignmentService,
              private teamSrv: TeamService,
              private assignmentTypeSrv: AssignmentTypeService,
              private messageService: MessageService) { }

  ngOnInit() {
  this.appUserTeamAssignment = new AppUserTeamAssignment();
  this.getTeams();
  this.getAssignmentTypes();
  }

  getTeams() {
    this.teamSrv.apiUrl = environment.team.root;
    this.teamAllSubscription = this.teamSrv.getAll().subscribe((items: Array<Team>) => {
      this.teams = items;
    });
  }

  getAssignmentTypes() {
    this.assignmentTypeSrv.apiUrl = environment.assignmentType.root;
    this.teamAllSubscription = this.assignmentTypeSrv.getAll().subscribe((items: Array<AssignmentType>) => {
      this.assignmentTypes = items;
    });
  }

  onSave() {
    this.appUserTeamAssignment.appUserID = this.selectedAppUser.appUserID;
    this.appUserTeamAssignment.teamID = this.appUserTeamAssignment.team.teamID;
    this.appUserTeamAssignment.assignmentTypeID = this.appUserTeamAssignment.assignmentType.assignmentTypeID;
    this.appUserTeamAssignment.createdBy = this.globalHelperSrv.getCurrentUser();
    this.appUserTeamAssignment.updatedBy = this.globalHelperSrv.getCurrentUser();
    this.appUserTeamAssignment.dateCreatedUTC = new Date().toUTCString();
    this.appUserTeamAssignment.lastUpdatedUTC = new Date().toUTCString();
    this.appUserTeamAssignment.team = null;
    this.appUserTeamAssignment.assignmentType = null;

    this.appUserTeamAssignmentSrv.apiUrl = environment.app_user.team_assignment.root;
    this.appUserTeamAssignmentAddSubscription = this.appUserTeamAssignmentSrv.post(this.appUserTeamAssignment).subscribe(result => {
    this.onClose();

    // Post Message
    this.messageService.add({severity: 'success', summary: 'Success Message',
    detail: 'User team assignment successfully created.' });

    this.appUserTeamAssignment = new AppUserTeamAssignment();
    }, error => { this.errorMessage = error; });
  }

  onClose() {
    this.displayChange.emit(false);
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.appUserTeamAssignmentAddSubscription) { this.appUserTeamAssignmentAddSubscription.unsubscribe(); }
    if (this.teamAllSubscription) { this.teamAllSubscription.unsubscribe(); }
    if (this.assignmentTypeAllSubscription) { this.assignmentTypeAllSubscription.unsubscribe(); }
  }


}
