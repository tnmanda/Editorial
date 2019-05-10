import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { AppUser } from '../../../../../shared/models/admin/app-user.model';
import { AppUserService } from '../../../../../shared/services/admin/app-user.service';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-user-management-delete-dialog',
  templateUrl: './user-management-delete-dialog.component.html',
  styleUrls: ['./user-management-delete-dialog.component.css'],
  providers: [MessageService]
})
export class UserManagementDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedAppUser: AppUser;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  appUserDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private appUserSrv: AppUserService,
              private messageService: MessageService) { }

  ngOnInit() {

  }

  onSave() {
    console.log(this.selectedAppUser.appUserID);
    this.appUserSrv.apiUrl = environment.app_user.root;
    this.appUserDeleteSubscription = this.appUserSrv.delete(this.selectedAppUser.appUserID).subscribe(result => {

      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: this.selectedAppUser.appUserName + ' successfully deleted.' });
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
    if (this.appUserDeleteSubscription) { this.appUserDeleteSubscription.unsubscribe(); }
  }

}
