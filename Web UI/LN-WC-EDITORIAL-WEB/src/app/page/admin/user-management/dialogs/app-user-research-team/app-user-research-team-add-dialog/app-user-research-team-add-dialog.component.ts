import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { AppUser } from 'src/app/shared/models/admin/app-user.model';
import { AppUserResearchTeam } from 'src/app/shared/models/admin/app_user/app-user-research-team.model';
import { Subscription } from 'rxjs';
import { Team } from 'src/app/shared/models/admin/team.model';
import { WorkUnitType } from 'src/app/shared/models/admin/types/work-unit-type.model';
import { Office } from 'src/app/shared/models/admin/office.model';
import { LanguageType } from 'src/app/shared/models/admin/types/language-type.model';
import { Country } from 'src/app/shared/models/admin/country.model';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { AppUserResearchTeamService } from 'src/app/shared/services/admin/app_user/app-user-research-team.service';
import { TeamService } from 'src/app/shared/services/admin/team.service';
import { MessageService } from 'primeng/api';
import { WorkUnitTypeService } from 'src/app/shared/services/admin/types/work-unit-type.service';
import { OfficeService } from 'src/app/shared/services/admin/office.service';
import { LanguageTypeService } from 'src/app/shared/services/admin/types/language-type.service';
import { CountryService } from 'src/app/shared/services/admin/country.service';
import { AppUserService } from 'src/app/shared/services/admin/app-user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-app-user-research-team-add-dialog',
  templateUrl: './app-user-research-team-add-dialog.component.html',
  styleUrls: ['./app-user-research-team-add-dialog.component.css']
})
export class AppUserResearchTeamAddDialogComponent implements OnInit, OnDestroy {

  @Input() selectedAppUser: AppUser;

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  appUserResearchTeam: AppUserResearchTeam;
  appUserResearchTeamAddSubscription: Subscription;
  teamAllSubscription: Subscription;
  workUnitTypeAllSubscription: Subscription;
  officeAllSubscription: Subscription;
  languageTypeAllSubscription: Subscription;
  countryAllSubscription: Subscription;
  appUserAllSubscription: Subscription;

  teams: Team[];
  workUnitTypes: WorkUnitType[];
  offices: Office[];
  languageTypes: LanguageType[];
  countries: Country[];
  appUsers: AppUser[];

  errorMessage: string;

  constructor(private globalHelperSrv: GlobalHelperService,
              private appUserResearchTeamSrv: AppUserResearchTeamService,
              private teamSrv: TeamService,
              private workUnitTypeSrv: WorkUnitTypeService,
              private officeSrv: OfficeService,
              private languageTypeSrv: LanguageTypeService,
              private countrySrv: CountryService,
              private appUserSrv: AppUserService,
              private messageService: MessageService) { }

  ngOnInit() {
  this.appUserResearchTeam = new AppUserResearchTeam();
  this.getTeams();
  this.getWorkUnitTypes();
  this.getAppUsers();
  this.getCountries();
  this.getLanguageTypes();
  this.getOffices();
  }

  getTeams() {
    this.teamSrv.apiUrl = environment.team.root;
    this.teamAllSubscription = this.teamSrv.getAll().subscribe((items: Array<Team>) => {
      this.teams = items;
    });
  }

  getWorkUnitTypes() {
    this.workUnitTypeSrv.apiUrl = environment.workUnitType.root;
    this.workUnitTypeAllSubscription = this.workUnitTypeSrv.getAll().subscribe((items: Array<WorkUnitType>) => {
        this.workUnitTypes = items;
    });
  }

  getOffices() {
    this.officeSrv.apiUrl = environment.office.root;
    this.officeAllSubscription = this.officeSrv.getAll().subscribe((items: Array<Office>) => {
        this.offices = items;
    });
  }

  getLanguageTypes() {
    this.languageTypeSrv.apiUrl = environment.languageType.root;
    this.languageTypeAllSubscription = this.languageTypeSrv.getAll().subscribe((items: Array<LanguageType>) => {
        this.languageTypes = items;
    });
  }

  getCountries() {
    this.countrySrv.apiUrl = environment.country.root;
    this.countryAllSubscription = this.countrySrv.getAll().subscribe((items: Array<Country>) => {
        this.countries = items;
    });
  }

  getAppUsers() {
    this.appUserSrv.apiUrl = environment.app_user.detail;
    this.appUserAllSubscription = this.appUserSrv.getAll().subscribe((items: Array<AppUser>) => {
        this.appUsers = items;
    });
  }

  onSave() {
    // this.appUserResearchTeam.appUserID = this.selectedAppUser.appUserID;
    this.appUserResearchTeam.teamID = this.appUserResearchTeam.team.teamID;
    this.appUserResearchTeam.workUnitTypeID = this.appUserResearchTeam.workUnitType.workUnitTypeID;
    this.appUserResearchTeam.languageTypeID = this.appUserResearchTeam.languageType.languageTypeID;
    this.appUserResearchTeam.officeID = this.appUserResearchTeam.office.officeID;
    this.appUserResearchTeam.countryID = this.appUserResearchTeam.country.countryID;
    this.appUserResearchTeam.leadUserID = this.appUserResearchTeam.leadUser.appUserID;
    this.appUserResearchTeam.createdBy = this.globalHelperSrv.getCurrentUser();
    this.appUserResearchTeam.updatedBy = this.globalHelperSrv.getCurrentUser();
    this.appUserResearchTeam.dateCreatedUTC = new Date().toUTCString();
    this.appUserResearchTeam.lastUpdatedUTC = new Date().toUTCString();
    this.appUserResearchTeam.team = null;

    this.appUserResearchTeamSrv.apiUrl = environment.app_user.research_team.root;
    this.appUserResearchTeamAddSubscription = this.appUserResearchTeamSrv.post(this.appUserResearchTeam).subscribe(result => {
    this.onClose();

    // Post Message
    this.messageService.add({severity: 'success', summary: 'Success Message',
    detail: 'User research team successfully created.' });

    this.appUserResearchTeam = new AppUserResearchTeam();
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
    if (this.appUserResearchTeamAddSubscription) { this.appUserResearchTeamAddSubscription.unsubscribe(); }
    if (this.teamAllSubscription) { this.teamAllSubscription.unsubscribe(); }
    if (this.workUnitTypeAllSubscription) { this.workUnitTypeAllSubscription.unsubscribe(); }
    if (this.officeAllSubscription) { this.officeAllSubscription.unsubscribe(); }
    if (this.languageTypeAllSubscription) { this.languageTypeAllSubscription.unsubscribe(); }
    if (this.countryAllSubscription) { this.countryAllSubscription.unsubscribe(); }
    if (this.appUserAllSubscription) { this.appUserAllSubscription.unsubscribe(); }
  }

}
