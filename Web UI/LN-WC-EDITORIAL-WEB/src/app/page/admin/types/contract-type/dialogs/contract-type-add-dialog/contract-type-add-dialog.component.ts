import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ContractType } from '../../../../../../shared/models/admin/types/contract-type.model';
import { Subscription } from 'rxjs';
import { GlobalHelperService } from '../../../../../../shared/helpers/global-helper.service';
import { ContractTypeService } from '../../../../../../shared/services/admin/types/contract-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-contract-type-add-dialog',
  templateUrl: './contract-type-add-dialog.component.html',
  styleUrls: ['./contract-type-add-dialog.component.css']
})
export class ContractTypeAddDialogComponent implements OnInit, OnDestroy {

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  contractType: ContractType;
  contractTypeAddSubscription: Subscription;

  errorMessage: string;

  constructor(private globalHelperSrv: GlobalHelperService,
    private contractTypeSrv: ContractTypeService,
    private messageService: MessageService) { }

  ngOnInit() {
  this.contractType = new ContractType();
  }

  onSave() {
  this.contractType.createdBy = this.globalHelperSrv.getCurrentUser();
  this.contractType.updatedBy = this.globalHelperSrv.getCurrentUser();
  this.contractType.dateCreatedUTC = new Date().toUTCString();
  this.contractType.lastUpdatedUTC = new Date().toUTCString();

  this.contractTypeSrv.apiUrl = environment.contractType.root;
  this.contractTypeAddSubscription = this.contractTypeSrv.post(this.contractType).subscribe(result => {
  this.onClose();

  // Post Message
  this.messageService.add({severity: 'success', summary: 'Success Message',
  detail: 'Item ' + this.contractType.contractTypeName + ' successfully created.' });

  this.contractType = new ContractType();
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
    if (this.contractTypeAddSubscription) { this.contractTypeAddSubscription.unsubscribe(); }
  }

}
