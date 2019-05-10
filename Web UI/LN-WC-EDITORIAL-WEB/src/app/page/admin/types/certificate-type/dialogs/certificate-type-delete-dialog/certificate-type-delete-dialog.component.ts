import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { CertificateType } from '../../../../../../shared/models/admin/types/certificate-type.model';
import { Subscription } from 'rxjs';
import { CertificateTypeService } from '../../../../../../shared/services/admin/types/certificate-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-certificate-type-delete-dialog',
  templateUrl: './certificate-type-delete-dialog.component.html',
  styleUrls: ['./certificate-type-delete-dialog.component.css']
})
export class CertificateTypeDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedCertificateType: CertificateType;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  certificateTypeDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private certificateTypeSrv: CertificateTypeService,
    private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.certificateTypeSrv.apiUrl = environment.certificateType.root;
    this.certificateTypeDeleteSubscription = this.certificateTypeSrv.delete(this.selectedCertificateType.certificateTypeID)
    .subscribe(result => {
    this.messageService.add({severity: 'success', summary: 'Success Message',
    detail: 'Item ' + this.selectedCertificateType.certificateTypeName + ' successfully deleted.' });
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
    if (this.certificateTypeDeleteSubscription) { this.certificateTypeDeleteSubscription.unsubscribe(); }
  }


}
