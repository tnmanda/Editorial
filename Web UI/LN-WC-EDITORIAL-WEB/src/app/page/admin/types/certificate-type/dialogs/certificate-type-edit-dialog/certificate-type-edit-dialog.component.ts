import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CertificateType } from '../../../../../../shared/models/admin/types/certificate-type.model';
import { Subscription } from 'rxjs';
import { GlobalHelperService } from '../../../../../../shared/helpers/global-helper.service';
import { CertificateTypeService } from '../../../../../../shared/services/admin/types/certificate-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-certificate-type-edit-dialog',
  templateUrl: './certificate-type-edit-dialog.component.html',
  styleUrls: ['./certificate-type-edit-dialog.component.css']
})
export class CertificateTypeEditDialogComponent implements OnInit, OnDestroy {

  @Input() selectedCertificateType: CertificateType;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  certificateTypeEditSubscription: Subscription;

  errorMessage: string;

  constructor(private globalHelperSrv: GlobalHelperService,
    private certificateTypeSrv: CertificateTypeService,
    private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
  this.selectedCertificateType.updatedBy = this.globalHelperSrv.getCurrentUser();
  this.selectedCertificateType.lastUpdatedUTC = new Date().toUTCString();

  this.certificateTypeSrv.apiUrl = environment.certificateType.root;
  this.certificateTypeEditSubscription = this.certificateTypeSrv.put(this.selectedCertificateType).subscribe(result => {
  this.onClose();

  // Post Message
  this.messageService.add({severity: 'success', summary: 'Success Message',
  detail: 'Item ' + this.selectedCertificateType.certificateTypeName + ' successfully updated.' });

  this.selectedCertificateType = new CertificateType();
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
    if (this.certificateTypeEditSubscription) { this.certificateTypeEditSubscription.unsubscribe(); }
  }

}
