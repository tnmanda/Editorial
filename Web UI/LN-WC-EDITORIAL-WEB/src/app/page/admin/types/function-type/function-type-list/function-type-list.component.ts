import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';
import { FunctionType } from '../../../../../shared/models/admin/types/function-type.model';
import { Subscription } from 'rxjs';
import { FunctionTypeService } from '../../../../../shared/services/admin/types/function-type.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-function-type-list',
  templateUrl: './function-type-list.component.html',
  styleUrls: ['./function-type-list.component.css'],
  providers: [MessageService]
})
export class FunctionTypeListComponent implements OnInit, OnDestroy {

  selectedFunctionType: FunctionType;
  functionTypeAllSubscription: Subscription;
  functionTypeOneSubscription: Subscription;

  functionTypes: FunctionType[];
  public items: MenuItem[];
  home: MenuItem;

  displayAddDialog = false;
  displayEditDialog = false;
  displayDeleteDialog = false;

  constructor(private functionTypeSrv: FunctionTypeService) { }

  ngOnInit() {
    this.items = [
      {label: 'Administrator'},
      {label: 'Function'},
    ];

    this.home = {icon: 'fa fa-home'};

    this.getFunctionTypes();
  }

  getFunctionTypes() {
    this.functionTypeSrv.apiUrl = environment.functionType.root;
    this.functionTypeAllSubscription = this.functionTypeSrv.getAll().subscribe((items: Array<FunctionType>) => {
        this.functionTypes = items;
    });
  }

  getFunctionTypeByID(functionTypeID: number) {
    this.functionTypeSrv.apiUrl = environment.functionType.root;
    this.functionTypeOneSubscription = this.functionTypeSrv.getSingle(functionTypeID.toString()).subscribe((item: FunctionType) => {
      this.selectedFunctionType = item;
    });
  }

  showAddDialog() {
    this.displayAddDialog = true;
    console.log('add');
  }

  onAddDialogClose(event) {
    this.displayAddDialog = event;
    this.getFunctionTypes();
  }

  showEditDialog(functionTypeID) {
    this.getFunctionTypeByID(functionTypeID);
    this.displayEditDialog = true;
  }

  onEditDialogClose(event) {
    this.displayEditDialog = event;
    this.getFunctionTypes();
  }

  showDeleteDialog(functionTypeID) {
    this.getFunctionTypeByID(functionTypeID);
    this.displayDeleteDialog = true;
  }

  onDeleteDialogClose(event) {
    this.displayDeleteDialog = event;
    this.getFunctionTypes();
  }

  ngOnDestroy(): void {
    if (this.functionTypeAllSubscription) { this.functionTypeAllSubscription.unsubscribe(); }
    if (this.functionTypeOneSubscription) { this.functionTypeOneSubscription.unsubscribe(); }
  }

}
