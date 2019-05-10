import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Office } from '../../../../../shared/models/admin/office.model';
import { Subscription } from 'rxjs';
import { OfficeService } from '../../../../../shared/services/admin/office.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-office-delete-dialog',
  templateUrl: './office-delete-dialog.component.html',
  styleUrls: ['./office-delete-dialog.component.css']
})
export class OfficeDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedOffice: Office;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  officeDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private officeSrv: OfficeService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.officeSrv.apiUrl = environment.office.root;
    this.officeDeleteSubscription = this.officeSrv.delete(this.selectedOffice.officeID).subscribe(result => {
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: this.selectedOffice.officeName + ' successfully deleted.' });
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
    if (this.officeDeleteSubscription) { this.officeDeleteSubscription.unsubscribe(); }
  }

}
