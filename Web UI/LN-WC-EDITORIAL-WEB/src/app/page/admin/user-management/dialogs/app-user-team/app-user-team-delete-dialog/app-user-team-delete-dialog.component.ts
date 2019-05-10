import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { AppUserTeam } from 'src/app/shared/models/admin/app_user/app-user-team.model';
import { Subscription } from 'rxjs';
import { AppUserTeamService } from 'src/app/shared/services/admin/app_user/app-user-team.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-app-user-team-delete-dialog',
  templateUrl: './app-user-team-delete-dialog.component.html',
  styleUrls: ['./app-user-team-delete-dialog.component.css']
})
export class AppUserTeamDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedAppUserTeam: AppUserTeam;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  appUserTeamDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private appUserTeamSrv: AppUserTeamService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.appUserTeamSrv.apiUrl = environment.app_user.team.root;
    this.appUserTeamDeleteSubscription = this.appUserTeamSrv.delete(this.selectedAppUserTeam.appUserTeamID)
    .subscribe(result => {
    this.messageService.add({severity: 'success', summary: 'Success Message',
    detail: 'User Team successfully deleted.' });
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
    if (this.appUserTeamDeleteSubscription) { this.appUserTeamDeleteSubscription.unsubscribe(); }
  }

}
