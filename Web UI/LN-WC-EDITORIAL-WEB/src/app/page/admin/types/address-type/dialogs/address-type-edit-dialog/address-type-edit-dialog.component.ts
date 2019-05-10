import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { AddressType } from '../../../../../../shared/models/admin/types/address-type.model';
import { AddressTypeService } from '../../../../../../shared/services/admin/types/address-type.service';
import { GlobalHelperService } from '../../../../../../shared/helpers/global-helper.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-address-type-edit-dialog',
  templateUrl: './address-type-edit-dialog.component.html',
  styleUrls: ['./address-type-edit-dialog.component.css']
})
export class AddressTypeEditDialogComponent implements OnInit, OnDestroy {

  @Input() selectedAddressType: AddressType;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  addressTypeEditSubscription: Subscription;

  errorMessage: string;

  constructor(private globalHelperSrv: GlobalHelperService,
              private addressTypeSrv: AddressTypeService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.selectedAddressType.updatedBy = this.globalHelperSrv.getCurrentUser();
    this.selectedAddressType.lastUpdatedUTC = new Date().toUTCString();

    this.addressTypeSrv.apiUrl = environment.addressType.root;
    this.addressTypeEditSubscription = this.addressTypeSrv.put(this.selectedAddressType).subscribe(result => {
      this.onClose();

      // Post Message
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'Item ' + this.selectedAddressType.addressTypeName + ' successfully updated.' });

      this.selectedAddressType = new AddressType();
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
    if (this.addressTypeEditSubscription) { this.addressTypeEditSubscription.unsubscribe(); }
  }


}
