import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { AppUserTeamAssignment } from 'src/app/shared/models/admin/app_user/app-user-team-assignment.model';
import { Subscription } from 'rxjs';
import { AppUserTeamAssignmentService } from 'src/app/shared/services/admin/app_user/app-user-team-assignment.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-app-user-team-assignment-delete-dialog',
  templateUrl: './app-user-team-assignment-delete-dialog.component.html',
  styleUrls: ['./app-user-team-assignment-delete-dialog.component.css']
})
export class AppUserTeamAssignmentDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedAppUserTeamAssignment: AppUserTeamAssignment;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  appUserTeamAssignmentDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private appUserTeamAssignmentSrv: AppUserTeamAssignmentService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.appUserTeamAssignmentSrv.apiUrl = environment.app_user.team_assignment.root;
    // tslint:disable-next-line:max-line-length
    this.appUserTeamAssignmentDeleteSubscription = this.appUserTeamAssignmentSrv.delete(this.selectedAppUserTeamAssignment.appUserTeamAssignmentID)
    .subscribe(result => {
    this.messageService.add({severity: 'success', summary: 'Success Message',
    detail: 'User Team Assignment successfully deleted.' });
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
    if (this.appUserTeamAssignmentDeleteSubscription) { this.appUserTeamAssignmentDeleteSubscription.unsubscribe(); }
  }


}
