import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddressType } from '../../../../../shared/models/admin/types/address-type.model';
import { Subscription } from 'rxjs';
import { MenuItem, MessageService } from 'primeng/api';
import { AddressTypeService } from '../../../../../shared/services/admin/types/address-type.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-address-type-list',
  templateUrl: './address-type-list.component.html',
  styleUrls: ['./address-type-list.component.css'],
  providers: [MessageService]
})
export class AddressTypeListComponent implements OnInit, OnDestroy {

  selectedAddressType: AddressType;
  addressTypeAllSubscription: Subscription;
  addressTypeOneSubscription: Subscription;

  addressTypes: AddressType[];
  public items: MenuItem[];
  home: MenuItem;

  displayAddDialog = false;
  displayEditDialog = false;
  displayDeleteDialog = false;

  constructor(private addressTypeSrv: AddressTypeService) { }

  ngOnInit() {
    this.items = [
      {label: 'Administrator'},
      {label: 'Address Type'},
    ];

    this.home = {icon: 'fa fa-home'};

    this.getAddressTypes();
  }

  getAddressTypes() {
    this.addressTypeSrv.apiUrl = environment.addressType.root;
    this.addressTypeAllSubscription = this.addressTypeSrv.getAll().subscribe((items: Array<AddressType>) => {
        this.addressTypes = items;
    });
  }

  getAddressTypeByID(addressTypeID: number) {
    this.addressTypeSrv.apiUrl = environment.addressType.root;
    this.addressTypeOneSubscription =  this.addressTypeSrv.getSingle(addressTypeID.toString()).subscribe((item: AddressType) => {
      this.selectedAddressType = item;
    });
  }

  showAddDialog() {
    this.displayAddDialog = true;
  }

  onAddDialogClose(event) {
    this.displayAddDialog = event;
    this.getAddressTypes();
  }

  showEditDialog(addressTypeID) {
    this.getAddressTypeByID(addressTypeID);
    this.displayEditDialog = true;
  }

  onEditDialogClose(event) {
    this.displayEditDialog = event;
    this.getAddressTypes();
  }

  showDeleteDialog(addressTypeID) {
    this.getAddressTypeByID(addressTypeID);
    this.displayDeleteDialog = true;
  }

  onDeleteDialogClose(event) {
    this.displayDeleteDialog = event;
    this.getAddressTypes();
  }


  ngOnDestroy(): void {
    if (this.addressTypeAllSubscription) { this.addressTypeAllSubscription.unsubscribe(); }
    if (this.addressTypeOneSubscription) { this.addressTypeOneSubscription.unsubscribe(); }
  }
}
