import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AddressType } from '../../../../../../shared/models/admin/types/address-type.model';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../../../environments/environment';
import { AddressTypeService } from '../../../../../../shared/services/admin/types/address-type.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-address-type-delete-dialog',
  templateUrl: './address-type-delete-dialog.component.html',
  styleUrls: ['./address-type-delete-dialog.component.css']
})
export class AddressTypeDeleteDialogComponent implements OnInit, OnDestroy {


  @Input() selectedAddressType: AddressType;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  addressTypeDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private addressTypeSrv: AddressTypeService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.addressTypeSrv.apiUrl = environment.addressType.root;
    this.addressTypeDeleteSubscription = this.addressTypeSrv.delete(this.selectedAddressType.addressTypeID).subscribe(result => {
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'Item ' + this.selectedAddressType.addressTypeName + ' successfully deleted.' });
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
    if (this.addressTypeDeleteSubscription) { this.addressTypeDeleteSubscription.unsubscribe(); }
  }
}
