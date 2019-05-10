import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { AppUserContract } from '../../../../../../shared/models/admin/app_user/app-user-contract.model';
import { Subscription } from 'rxjs';
import { AppUserContractService } from '../../../../../../shared/services/admin/app_user/app-user-contract.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-app-user-contract-delete-dialog',
  templateUrl: './app-user-contract-delete-dialog.component.html',
  styleUrls: ['./app-user-contract-delete-dialog.component.css']
})
export class AppUserContractDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedAppUserContract: AppUserContract;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  appUserContractDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private appUserContractSrv: AppUserContractService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.appUserContractSrv.apiUrl = environment.app_user.contract.root;
    this.appUserContractDeleteSubscription = this.appUserContractSrv.delete(this.selectedAppUserContract.appUserContractID)
    .subscribe(result => {
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'User contract successfully deleted.' });
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
    if (this.appUserContractDeleteSubscription) { this.appUserContractDeleteSubscription.unsubscribe(); }
  }

}
