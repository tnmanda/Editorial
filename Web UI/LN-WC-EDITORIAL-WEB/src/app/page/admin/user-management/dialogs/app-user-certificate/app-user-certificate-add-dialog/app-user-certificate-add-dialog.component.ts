import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { AppUser } from '../../../../../../shared/models/admin/app-user.model';
import { AppUserCertificate } from '../../../../../../shared/models/admin/app_user/app-user-certificate.model';
import { Subscription } from 'rxjs';
import { CertificateType } from '../../../../../../shared/models/admin/types/certificate-type.model';
import { GlobalHelperService } from '../../../../../../shared/helpers/global-helper.service';
import { AppUserCertificateService } from '../../../../../../shared/services/admin/app_user/app-user-certificate.service';
import { CertificateTypeService } from '../../../../../../shared/services/admin/types/certificate-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-app-user-certificate-add-dialog',
  templateUrl: './app-user-certificate-add-dialog.component.html',
  styleUrls: ['./app-user-certificate-add-dialog.component.css']
})
export class AppUserCertificateAddDialogComponent implements OnInit, OnDestroy {

  @Input() selectedAppUser: AppUser;

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  appUserCertificate: AppUserCertificate;

  appUserCertificateAddSubscription: Subscription;
  certificateTypeAllSubscription: Subscription;

  certificateTypes: CertificateType[];

  errorMessage: string;

  constructor(private globalHelperSrv: GlobalHelperService,
              private appUserCertificateSrv: AppUserCertificateService,
              private certificateTypeSrv: CertificateTypeService,
              private messageService: MessageService) { }

  ngOnInit() {
  this.appUserCertificate = new AppUserCertificate();
  this.getCertificateTypes();
  }

  getCertificateTypes() {
    this.certificateTypeSrv.apiUrl = environment.certificateType.root;
    this.certificateTypeAllSubscription = this.certificateTypeSrv.getAll().subscribe((items: Array<CertificateType>) => {
        this.certificateTypes = items;
    });
  }

  onSave() {
    this.appUserCertificate.appUserID = this.selectedAppUser.appUserID;
    this.appUserCertificate.certificateTypeID = this.appUserCertificate.certificateType.certificateTypeID;
    this.appUserCertificate.createdBy = this.globalHelperSrv.getCurrentUser();
    this.appUserCertificate.updatedBy = this.globalHelperSrv.getCurrentUser();
    this.appUserCertificate.dateCreatedUTC = new Date().toUTCString();
    this.appUserCertificate.lastUpdatedUTC = new Date().toUTCString();
    this.appUserCertificate.certificateType = null;

    this.appUserCertificateSrv.apiUrl = environment.app_user.certificate.root;
    this.appUserCertificateAddSubscription = this.appUserCertificateSrv.post(this.appUserCertificate).subscribe(result => {
    this.onClose();

    // Post Message
    this.messageService.add({severity: 'success', summary: 'Success Message',
    detail: 'User Certificate successfully created.' });

    this.appUserCertificate = new AppUserCertificate();
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
    if (this.appUserCertificateAddSubscription) { this.appUserCertificateAddSubscription.unsubscribe(); }
    if (this.certificateTypeAllSubscription) { this.certificateTypeAllSubscription.unsubscribe(); }
  }

}
