import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AddressType } from '../../../../../../shared/models/admin/types/address-type.model';
import { GlobalHelperService } from '../../../../../../shared/helpers/global-helper.service';
import { AddressTypeService } from '../../../../../../shared/services/admin/types/address-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-address-type-add-dialog',
  templateUrl: './address-type-add-dialog.component.html',
  styleUrls: ['./address-type-add-dialog.component.css']
})
export class AddressTypeAddDialogComponent implements OnInit, OnDestroy {

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  addressType: AddressType;
  addressTypeAddSubscription: Subscription;

  errorMessage: string;

  constructor(private globalHelperSrv: GlobalHelperService,
              private addressTypeSrv: AddressTypeService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.addressType = new AddressType();
  }

  onSave() {
    this.addressType.createdBy = this.globalHelperSrv.getCurrentUser();
    this.addressType.updatedBy = this.globalHelperSrv.getCurrentUser();
    this.addressType.dateCreatedUTC = new Date().toUTCString();
    this.addressType.lastUpdatedUTC = new Date().toUTCString();

    this.addressTypeSrv.apiUrl = environment.addressType.root;
    this.addressTypeAddSubscription = this.addressTypeSrv.post(this.addressType).subscribe(result => {
      this.onClose();

      // Post Message
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'Item ' + this.addressType.addressTypeName + ' successfully created.' });

      this.addressType = new AddressType();
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
    if (this.addressTypeAddSubscription) { this.addressTypeAddSubscription.unsubscribe(); }
  }


}
