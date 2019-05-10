import { Component, OnInit, OnDestroy } from '@angular/core';
import { Team } from '../../../../shared/models/admin/team.model';
import { Subscription } from 'rxjs';
import { MenuItem, MessageService } from 'primeng/api';
import { TeamService } from '../../../../shared/services/admin/team.service';
import { environment } from '../../../../../environments/environment';
import { OfficeService } from '../../../../shared/services/admin/office.service';
import { LanguageTypeService } from '../../../../shared/services/admin/types/language-type.service';
import { AppUserService } from '../../../../shared/services/admin/app-user.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css'],
  providers: [MessageService]
})
export class TeamListComponent implements OnInit, OnDestroy {

  selectedTeam: Team;

  teamAllSubscription: Subscription;
  teamOneSubscription: Subscription;

  officeAllSubscription: Subscription;
  languageTypeAllSubscription: Subscription;
  appUserAllSubscription: Subscription;

  teams: Team[];
  public items: MenuItem[];
  home: MenuItem;

  displayAddDialog = false;
  displayEditDialog = false;
  displayDeleteDialog = false;

  constructor(private teamSrv: TeamService,
              private officeSrv: OfficeService,
              private languageTypeSrv: LanguageTypeService,
              private appUserSrv: AppUserService) { }

  ngOnInit() {
    this.items = [
      {label: 'Administrator'},
      {label: 'Teams', url: 'team'},
    ];

    this.home = {icon: 'fa fa-home', url: 'home'};

    this.getTeams();
  }

  getTeams() {
    this.teamSrv.apiUrl = environment.team.root;
    this.teamAllSubscription = this.teamSrv.getAll().subscribe((items: Array<Team>) => {
      this.teams = items;
    });
  }

  showAddDialog() {
    this.displayAddDialog = true;
  }

  onAddDialogClose(event) {
    this.displayAddDialog = event;
    this.getTeams();
  }

  showEditDialog(teamID) {
    this.displayEditDialog = true;

    this.teamSrv.apiUrl = environment.team.root;
    this.teamOneSubscription = this.teamSrv.getSingle(teamID).subscribe(async (item: Team) => {
        this.officeSrv.apiUrl = environment.office.root;
        this.languageTypeSrv.apiUrl = environment.languageType.root;
        this.appUserSrv.apiUrl = environment.app_user.root;
        const officeResult = await this.officeSrv.getSingle(item.officeID.toString()).toPromise();
        const languageTypeResult = await this.languageTypeSrv.getSingle(item.languageTypeID.toString()).toPromise();
        const appUserResult = await this.appUserSrv.getSingle(item.leadUserID.toString()).toPromise();
        officeResult.country = null;
        item.office = officeResult;
        item.languageType = languageTypeResult;
        item.leadUser = appUserResult;

        this.selectedTeam = item;
        console.log(this.selectedTeam);
    });
  }



  onEditDialogClose(event) {
    this.displayEditDialog = event;
    this.getTeams();
  }

  showDeleteDialog(teamID) {
    this.displayDeleteDialog = true;
    this.teamSrv.apiUrl = environment.team.root;
    this.teamOneSubscription = this.teamSrv.getSingle(teamID).subscribe((item: Team) => {
        this.selectedTeam = item;
    });
  }

  onDeleteDialogClose(event) {
    this.displayDeleteDialog = event;
    this.getTeams();
  }

  ngOnDestroy(): void {
    if (this.teamAllSubscription) { this.teamAllSubscription.unsubscribe(); }
    if (this.teamOneSubscription) { this.teamOneSubscription.unsubscribe(); }
    if (this.officeAllSubscription) { this.officeAllSubscription.unsubscribe(); }
    if (this.languageTypeAllSubscription) { this.languageTypeAllSubscription.unsubscribe(); }
    if (this.appUserAllSubscription) { this.appUserAllSubscription.unsubscribe(); }
  }
}
