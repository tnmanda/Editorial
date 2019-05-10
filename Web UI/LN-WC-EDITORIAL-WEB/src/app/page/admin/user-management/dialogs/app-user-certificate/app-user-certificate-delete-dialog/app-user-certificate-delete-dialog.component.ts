import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { AppUserCertificate } from '../../../../../../shared/models/admin/app_user/app-user-certificate.model';
import { Subscription } from 'rxjs';
import { AppUserCertificateService } from '../../../../../../shared/services/admin/app_user/app-user-certificate.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-app-user-certificate-delete-dialog',
  templateUrl: './app-user-certificate-delete-dialog.component.html',
  styleUrls: ['./app-user-certificate-delete-dialog.component.css']
})
export class AppUserCertificateDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedAppUserCertificate: AppUserCertificate;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  appUserCertificateDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private appUserCertificateSrv: AppUserCertificateService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.appUserCertificateSrv.apiUrl = environment.app_user.certificate.root;
    this.appUserCertificateDeleteSubscription = this.appUserCertificateSrv
    .delete(this.selectedAppUserCertificate.appUserCertificateID).subscribe(result => {
    this.messageService.add({severity: 'success', summary: 'Success Message',
    detail: 'User Certificate successfully deleted.' });
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
    if (this.appUserCertificateDeleteSubscription) { this.appUserCertificateDeleteSubscription.unsubscribe(); }
  }


}
