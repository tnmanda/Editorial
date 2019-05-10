import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ContractType } from '../../../../../../shared/models/admin/types/contract-type.model';
import { Subscription } from 'rxjs';
import { ContractTypeService } from '../../../../../../shared/services/admin/types/contract-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-contract-type-delete-dialog',
  templateUrl: './contract-type-delete-dialog.component.html',
  styleUrls: ['./contract-type-delete-dialog.component.css']
})
export class ContractTypeDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedContractType: ContractType;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  contractTypeDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private contractTypeSrv: ContractTypeService,
    private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
  this.contractTypeSrv.apiUrl = environment.contractType.root;
  this.contractTypeDeleteSubscription = this.contractTypeSrv.delete(this.selectedContractType.contractTypeID).subscribe(result => {
  this.messageService.add({severity: 'success', summary: 'Success Message',
  detail: 'Item ' + this.selectedContractType.contractTypeName + ' successfully deleted.' });
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
    if (this.contractTypeDeleteSubscription) { this.contractTypeDeleteSubscription.unsubscribe(); }
  }


}
