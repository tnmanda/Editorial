import { Component, OnInit, OnDestroy, EventEmitter, Input, Output } from '@angular/core';
import { CertificateType } from '../../../../../../shared/models/admin/types/certificate-type.model';
import { Subscription } from 'rxjs';
import { GlobalHelperService } from '../../../../../../shared/helpers/global-helper.service';
import { CertificateTypeService } from '../../../../../../shared/services/admin/types/certificate-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-certificate-type-add-dialog',
  templateUrl: './certificate-type-add-dialog.component.html',
  styleUrls: ['./certificate-type-add-dialog.component.css']
})
export class CertificateTypeAddDialogComponent implements OnInit, OnDestroy {

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  certificateType: CertificateType;
  certificateTypeAddSubscription: Subscription;

  errorMessage: string;

  constructor(private globalHelperSrv: GlobalHelperService,
    private certificateTypeSrv: CertificateTypeService,
    private messageService: MessageService) { }

  ngOnInit() {
  this.certificateType = new CertificateType();
  }

  onSave() {
  this.certificateType.createdBy = this.globalHelperSrv.getCurrentUser();
  this.certificateType.updatedBy = this.globalHelperSrv.getCurrentUser();
  this.certificateType.dateCreatedUTC = new Date().toUTCString();
  this.certificateType.lastUpdatedUTC = new Date().toUTCString();

  this.certificateTypeSrv.apiUrl = environment.certificateType.root;
  this.certificateTypeAddSubscription = this.certificateTypeSrv.post(this.certificateType).subscribe(result => {
  this.onClose();

  // Post Message
  this.messageService.add({severity: 'success', summary: 'Success Message',
  detail: 'Item ' + this.certificateType.certificateTypeName + ' successfully created.' });

  this.certificateType = new CertificateType();
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
    if (this.certificateTypeAddSubscription) { this.certificateTypeAddSubscription.unsubscribe(); }
  }

}
