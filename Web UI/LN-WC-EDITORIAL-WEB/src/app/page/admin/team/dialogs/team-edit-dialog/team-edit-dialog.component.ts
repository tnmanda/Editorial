import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Team } from '../../../../../shared/models/admin/team.model';
import { Subscription } from 'rxjs';
import { GlobalHelperService } from '../../../../../shared/helpers/global-helper.service';
import { OfficeService } from '../../../../../shared/services/admin/office.service';
import { LanguageTypeService } from '../../../../../shared/services/admin/types/language-type.service';
import { AppUserService } from '../../../../../shared/services/admin/app-user.service';
import { TeamService } from '../../../../../shared/services/admin/team.service';
import { MessageService } from 'primeng/api';
import { Office } from '../../../../../shared/models/admin/office.model';
import { LanguageType } from '../../../../../shared/models/admin/types/language-type.model';
import { AppUser } from '../../../../../shared/models/admin/app-user.model';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-team-edit-dialog',
  templateUrl: './team-edit-dialog.component.html',
  styleUrls: ['./team-edit-dialog.component.css']
})
export class TeamEditDialogComponent implements OnInit, OnDestroy {

  @Input() selectedTeam: Team;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  teams: Team[];

  offices: Office[];
  languageTypes: LanguageType[];
  appUsers: AppUser[];

  officeAllSubscription: Subscription;
  languageTypeAllSubscription: Subscription;
  appUserAllSubscription: Subscription;
  teamEditSubscription: Subscription;

  errorMessage: string;

  constructor(private globalHelperSrv: GlobalHelperService,
    private officeSrv: OfficeService,
    private languageTypeSrv: LanguageTypeService,
    private appUserSrv: AppUserService,
    private teamSrv: TeamService,
    private messageService: MessageService) { }

  ngOnInit() {
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
    this.selectedTeam.officeID = this.selectedTeam.office.officeID;
    this.selectedTeam.languageTypeID = this.selectedTeam.languageType.languageTypeID;
    this.selectedTeam.leadUserID = this.selectedTeam.leadUser.appUserID;
    this.selectedTeam.updatedBy = this.globalHelperSrv.getCurrentUser();
    this.selectedTeam.lastUpdatedUTC = new Date().toUTCString();

    this.teamSrv.apiUrl = environment.team.root;
    this.teamEditSubscription = this.teamSrv.put(this.selectedTeam).subscribe(result => {
      this.onClose();

      // Post Message
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'Item ' + this.selectedTeam.officeName + ' successfully updated.' });

      this.selectedTeam = new Team();
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
    if (this.officeAllSubscription) { this.officeAllSubscription.unsubscribe(); }
    if (this.languageTypeAllSubscription) { this.languageTypeAllSubscription.unsubscribe(); }
    if (this.appUserAllSubscription) { this.appUserAllSubscription.unsubscribe(); }
    if (this.teamEditSubscription) { this.teamEditSubscription.unsubscribe(); }
  }
}
