import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { DepartureType } from '../../../../../../shared/models/admin/types/departure-type.model';
import { GlobalHelperService } from '../../../../../../shared/helpers/global-helper.service';
import { DepartureTypeService } from '../../../../../../shared/services/admin/types/departure-type.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-departure-type-edit-dialog',
  templateUrl: './departure-type-edit-dialog.component.html',
  styleUrls: ['./departure-type-edit-dialog.component.css']
})
export class DepartureTypeEditDialogComponent implements OnInit, OnDestroy {

  @Input() selectedDepartureType: DepartureType;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  departureTypeEditSubscription: Subscription;

  errorMessage: string;

  constructor(private globalHelperSrv: GlobalHelperService,
    private departureTypeSrv: DepartureTypeService,
    private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
  this.selectedDepartureType.updatedBy = this.globalHelperSrv.getCurrentUser();
  this.selectedDepartureType.lastUpdatedUTC = new Date().toUTCString();

  this.departureTypeSrv.apiUrl = environment.departureType.root;
  this.departureTypeEditSubscription = this.departureTypeSrv.put(this.selectedDepartureType).subscribe(result => {
  this.onClose();

  // Post Message
  this.messageService.add({severity: 'success', summary: 'Success Message',
  detail: 'Item ' + this.selectedDepartureType.departureTypeName + ' successfully updated.' });

  this.selectedDepartureType = new DepartureType();
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
    if (this.departureTypeEditSubscription) { this.departureTypeEditSubscription.unsubscribe(); }
  }


}
