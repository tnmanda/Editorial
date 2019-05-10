import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { AppUserResearchTeam } from 'src/app/shared/models/admin/app_user/app-user-research-team.model';
import { Subscription } from 'rxjs';
import { AppUserResearchTeamService } from 'src/app/shared/services/admin/app_user/app-user-research-team.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-app-user-research-team-delete-dialog',
  templateUrl: './app-user-research-team-delete-dialog.component.html',
  styleUrls: ['./app-user-research-team-delete-dialog.component.css']
})
export class AppUserResearchTeamDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedAppUserResearchTeam: AppUserResearchTeam;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  appUserResearchTeamDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private appUserResearchTeamSrv: AppUserResearchTeamService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.appUserResearchTeamSrv.apiUrl = environment.app_user.research_team.root;
    this.appUserResearchTeamDeleteSubscription = this.appUserResearchTeamSrv.delete(this.selectedAppUserResearchTeam.appUserResearchTeamID)
    .subscribe(result => {
    this.messageService.add({severity: 'success', summary: 'Success Message',
    detail: 'User Research Team successfully deleted.' });
    this.onClose();
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
    if (this.appUserResearchTeamDeleteSubscription) { this.appUserResearchTeamDeleteSubscription.unsubscribe(); }
  }


}
