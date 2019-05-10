import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { AppUserAddress } from '../../../../../../shared/models/admin/app_user/app-user-address.model';
import { Subscription } from 'rxjs';
import { AppUserAddressService } from '../../../../../../shared/services/admin/app_user/app-user-address.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-app-user-address-delete-dialog',
  templateUrl: './app-user-address-delete-dialog.component.html',
  styleUrls: ['./app-user-address-delete-dialog.component.css']
})
export class AppUserAddressDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedAppUserAddress: AppUserAddress;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  appUserAddressDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private appUserAddressSrv: AppUserAddressService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.appUserAddressSrv.apiUrl = environment.app_user.address.root;
    this.appUserAddressDeleteSubscription = this.appUserAddressSrv.delete(this.selectedAppUserAddress.appUserAddressID)
    .subscribe(result => {
    this.messageService.add({severity: 'success', summary: 'Success Message',
    detail: 'User Address successfully deleted.' });
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
    if (this.appUserAddressDeleteSubscription) { this.appUserAddressDeleteSubscription.unsubscribe(); }
  }

}
