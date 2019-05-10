import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';
import { ContractType } from '../../../../../shared/models/admin/types/contract-type.model';
import { Subscription } from 'rxjs';
import { ContractTypeService } from '../../../../../shared/services/admin/types/contract-type.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-contract-type-list',
  templateUrl: './contract-type-list.component.html',
  styleUrls: ['./contract-type-list.component.css'],
  providers: [MessageService]
})
export class ContractTypeListComponent implements OnInit, OnDestroy {

  selectedContractType: ContractType;
  contractTypeAllSubscription: Subscription;
  contractTypeOneSubscription: Subscription;

  contractTypes: ContractType[];
  public items: MenuItem[];
  home: MenuItem;

  displayAddDialog = false;
  displayEditDialog = false;
  displayDeleteDialog = false;

  constructor(private contractTypeSrv: ContractTypeService) { }

  ngOnInit() {
    this.items = [
      {label: 'Administrator'},
      {label: 'Contract'},
    ];

    this.home = {icon: 'fa fa-home'};

    this.getContractTypes();
  }

  getContractTypes() {
    this.contractTypeSrv.apiUrl = environment.contractType.root;
    this.contractTypeAllSubscription = this.contractTypeSrv.getAll().subscribe((items: Array<ContractType>) => {
        this.contractTypes = items;
    });
  }

  getContractTypeByID(contractTypeID: number) {
    this.contractTypeSrv.apiUrl = environment.contractType.root;
    this.contractTypeOneSubscription = this.contractTypeSrv.getSingle(contractTypeID.toString()).subscribe((item: ContractType) => {
      this.selectedContractType = item;
    });
  }

  showAddDialog() {
    this.displayAddDialog = true;
  }

  onAddDialogClose(event) {
    this.displayAddDialog = event;
    this.getContractTypes();
  }

  showEditDialog(contractTypeID) {
    this.getContractTypeByID(contractTypeID);
    this.displayEditDialog = true;
  }

  onEditDialogClose(event) {
    this.displayEditDialog = event;
    this.getContractTypes();
  }

  showDeleteDialog(contractTypeID) {
    this.getContractTypeByID(contractTypeID);
    this.displayDeleteDialog = true;
  }

  onDeleteDialogClose(event) {
    this.displayDeleteDialog = event;
    this.getContractTypes();
  }


  ngOnDestroy(): void {
    if (this.contractTypeAllSubscription) { this.contractTypeAllSubscription.unsubscribe(); }
    if (this.contractTypeOneSubscription) { this.contractTypeOneSubscription.unsubscribe(); }
  }

}
