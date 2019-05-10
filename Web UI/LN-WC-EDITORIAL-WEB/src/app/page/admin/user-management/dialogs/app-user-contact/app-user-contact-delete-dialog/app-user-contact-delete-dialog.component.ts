import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { AppUserContact } from '../../../../../../shared/models/admin/app_user/app-user-contact.model';
import { Subscription } from 'rxjs';
import { AppUserContactService } from '../../../../../../shared/services/admin/app_user/app-user-contact.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-app-user-contact-delete-dialog',
  templateUrl: './app-user-contact-delete-dialog.component.html',
  styleUrls: ['./app-user-contact-delete-dialog.component.css']
})
export class AppUserContactDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedAppUserContact: AppUserContact;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  appUserContactDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private appUserContactSrv: AppUserContactService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.appUserContactSrv.apiUrl = environment.app_user.contact.root;
    this.appUserContactDeleteSubscription = this.appUserContactSrv.delete(this.selectedAppUserContact.appUserContactID)
    .subscribe(result => {
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'User contact successfully deleted.' });
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
    if (this.appUserContactDeleteSubscription) { this.appUserContactDeleteSubscription.unsubscribe(); }
  }

}
