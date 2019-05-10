import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { AppUser } from 'src/app/shared/models/admin/app-user.model';
import { AppUserTeam } from 'src/app/shared/models/admin/app_user/app-user-team.model';
import { Subscription } from 'rxjs';
import { Team } from 'src/app/shared/models/admin/team.model';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { AppUserTeamService } from 'src/app/shared/services/admin/app_user/app-user-team.service';
import { TeamService } from 'src/app/shared/services/admin/team.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-app-user-team-add-dialog',
  templateUrl: './app-user-team-add-dialog.component.html',
  styleUrls: ['./app-user-team-add-dialog.component.css']
})
export class AppUserTeamAddDialogComponent implements OnInit, OnDestroy {

  @Input() selectedAppUser: AppUser;

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  appUserTeam: AppUserTeam;
  appUserTeamAddSubscription: Subscription;
  teamAllSubscription: Subscription;

  teams: Team[];

  errorMessage: string;

  constructor(private globalHelperSrv: GlobalHelperService,
              private appUserTeamSrv: AppUserTeamService,
              private teamSrv: TeamService,
              private messageService: MessageService) { }

  ngOnInit() {
  this.appUserTeam = new AppUserTeam();
  this.getTeams();
  }

  getTeams() {
    this.teamSrv.apiUrl = environment.team.root;
    this.teamAllSubscription = this.teamSrv.getAll().subscribe((items: Array<Team>) => {
      this.teams = items;
    });
  }

  onSave() {
    this.appUserTeam.appUserID = this.selectedAppUser.appUserID;
    this.appUserTeam.teamID = this.appUserTeam.team.teamID;
    this.appUserTeam.createdBy = this.globalHelperSrv.getCurrentUser();
    this.appUserTeam.updatedBy = this.globalHelperSrv.getCurrentUser();
    this.appUserTeam.dateCreatedUTC = new Date().toUTCString();
    this.appUserTeam.lastUpdatedUTC = new Date().toUTCString();
    this.appUserTeam.team = null;

    this.appUserTeamSrv.apiUrl = environment.app_user.team.root;
    this.appUserTeamAddSubscription = this.appUserTeamSrv.post(this.appUserTeam).subscribe(result => {
    this.onClose();

    // Post Message
    this.messageService.add({severity: 'success', summary: 'Success Message',
    detail: 'User team successfully created.' });

    this.appUserTeam = new AppUserTeam();
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
    if (this.appUserTeamAddSubscription) { this.appUserTeamAddSubscription.unsubscribe(); }
    if (this.teamAllSubscription) { this.teamAllSubscription.unsubscribe(); }
  }

}
