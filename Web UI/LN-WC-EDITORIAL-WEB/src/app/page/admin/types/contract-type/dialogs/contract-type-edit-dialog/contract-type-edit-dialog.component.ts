import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { GlobalHelperService } from '../../../../../../shared/helpers/global-helper.service';
import { ContractTypeService } from '../../../../../../shared/services/admin/types/contract-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';
import { ContractType } from '../../../../../../shared/models/admin/types/contract-type.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contract-type-edit-dialog',
  templateUrl: './contract-type-edit-dialog.component.html',
  styleUrls: ['./contract-type-edit-dialog.component.css']
})
export class ContractTypeEditDialogComponent implements OnInit, OnDestroy {

  @Input() selectedContractType: ContractType;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  contractTypeEditSubscription: Subscription;

  errorMessage: string;

  constructor(private globalHelperSrv: GlobalHelperService,
    private contractTypeSrv: ContractTypeService,
    private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
  this.selectedContractType.updatedBy = this.globalHelperSrv.getCurrentUser();
  this.selectedContractType.lastUpdatedUTC = new Date().toUTCString();

  this.contractTypeSrv.apiUrl = environment.contractType.root;
  this.contractTypeEditSubscription = this.contractTypeSrv.put(this.selectedContractType).subscribe(result => {
  this.onClose();

  // Post Message
  this.messageService.add({severity: 'success', summary: 'Success Message',
  detail: 'Item ' + this.selectedContractType.contractTypeName + ' successfully updated.' });

  this.selectedContractType = new ContractType();
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
    if (this.contractTypeEditSubscription) { this.contractTypeEditSubscription.unsubscribe(); }
  }

}
