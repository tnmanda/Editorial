import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { AppUserInRole } from '../../../../../../shared/models/admin/app_user/app-user-in-role.model';
import { Subscription } from 'rxjs';
import { AppUserInRoleService } from '../../../../../../shared/services/admin/app_user/app-user-in-role.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-app-user-in-role-delete-dialog',
  templateUrl: './app-user-in-role-delete-dialog.component.html',
  styleUrls: ['./app-user-in-role-delete-dialog.component.css']
})
export class AppUserInRoleDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedAppUserInRole: AppUserInRole;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  appUserInRoleDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private appUserInRoleSrv: AppUserInRoleService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.appUserInRoleSrv.apiUrl = environment.app_user.role.root;
    this.appUserInRoleDeleteSubscription = this.appUserInRoleSrv
    .delete(this.selectedAppUserInRole.appUserInRoleID).subscribe(result => {
    this.messageService.add({severity: 'success', summary: 'Success Message',
    detail: 'User Role successfully deleted.' });
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
    if (this.appUserInRoleDeleteSubscription) { this.appUserInRoleDeleteSubscription.unsubscribe(); }
  }


}
