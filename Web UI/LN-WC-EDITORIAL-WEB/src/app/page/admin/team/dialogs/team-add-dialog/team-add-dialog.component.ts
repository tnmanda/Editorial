import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Team } from '../../../../../shared/models/admin/team.model';
import { Subscription } from 'rxjs';
import { GlobalHelperService } from '../../../../../shared/helpers/global-helper.service';
import { OfficeService } from '../../../../../shared/services/admin/office.service';
import { LanguageTypeService } from '../../../../../shared/services/admin/types/language-type.service';
import { MessageService } from 'primeng/api';
import { AppUserService } from '../../../../../shared/services/admin/app-user.service';
import { environment } from '../../../../../../environments/environment';
import { Office } from '../../../../../shared/models/admin/office.model';
import { AppUser } from '../../../../../shared/models/admin/app-user.model';
import { LanguageType } from '../../../../../shared/models/admin/types/language-type.model';
import { TeamService } from '../../../../../shared/services/admin/team.service';

@Component({
  selector: 'app-team-add-dialog',
  templateUrl: './team-add-dialog.component.html',
  styleUrls: ['./team-add-dialog.component.css']
})
export class TeamAddDialogComponent implements OnInit, OnDestroy {

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  team: Team;
  teams: Team[];

  offices: Office[];
  languageTypes: LanguageType[];
  appUsers: AppUser[];

  officeAllSubscription: Subscription;
  languageTypeAllSubscription: Subscription;
  appUserAllSubscription: Subscription;
  teamAddSubscription: Subscription;

  errorMessage: string;

  constructor(private globalHelperSrv: GlobalHelperService,
              private officeSrv: OfficeService,
              private languageTypeSrv: LanguageTypeService,
              private appUserSrv: AppUserService,
              private teamSrv: TeamService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.team = new Team();
    this.getOffices();
    this.getLanguageTypes();
    this.getAppUsers();
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

  getAppUsers() {
    this.appUserSrv.apiUrl = environment.app_user.root;
    this.appUserAllSubscription = this.appUserSrv.getAll().subscribe((items: Array<AppUser>) => {
      this.appUsers = items;
    });
  }

  onSave() {
    this.team.officeID = this.team.office.officeID;
    this.team.languageTypeID = this.team.languageType.languageTypeID;
    this.team.leadUserID = this.team.leadUser.appUserID;
    this.team.createdBy = this.globalHelperSrv.getCurrentUser();
    this.team.updatedBy = this.globalHelperSrv.getCurrentUser();
    this.team.dateCreatedUTC = new Date().toUTCString();
    this.team.lastUpdatedUTC = new Date().toUTCString();
    this.team.office = null;
    this.team.languageType = null;
    this.team.leadUser = null;

    this.teamSrv.apiUrl = environment.team.root;
    this.teamAddSubscription = this.teamSrv.post(this.team).subscribe(result => {
      this.onClose();

      // Post Message
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'Team successfully created.' });

      this.team = new Team();
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
    if (this.teamAddSubscription) { this.teamAddSubscription.unsubscribe(); }
    if (this.officeAllSubscription) { this.officeAllSubscription.unsubscribe(); }
    if (this.languageTypeAllSubscription) { this.languageTypeAllSubscription.unsubscribe(); }
    if (this.appUserAllSubscription) { this.appUserAllSubscription.unsubscribe(); }
  }

}
