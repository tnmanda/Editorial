import { Component, OnInit, OnDestroy, EventEmitter, Input, Output } from '@angular/core';
import { DepartureType } from '../../../../../../shared/models/admin/types/departure-type.model';
import { GlobalHelperService } from '../../../../../../shared/helpers/global-helper.service';
import { Subscription } from 'rxjs';
import { DepartureTypeService } from '../../../../../../shared/services/admin/types/departure-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-departure-type-add-dialog',
  templateUrl: './departure-type-add-dialog.component.html',
  styleUrls: ['./departure-type-add-dialog.component.css']
})
export class DepartureTypeAddDialogComponent implements OnInit, OnDestroy {

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  departureType: DepartureType;
  departureTypeAddSubscription: Subscription;

  errorMessage: string;

  constructor(private globalHelperSrv: GlobalHelperService,
    private departureTypeSrv: DepartureTypeService,
    private messageService: MessageService) { }

  ngOnInit() {
  this.departureType = new DepartureType();
  }

  onSave() {
  this.departureType.createdBy = this.globalHelperSrv.getCurrentUser();
  this.departureType.updatedBy = this.globalHelperSrv.getCurrentUser();
  this.departureType.dateCreatedUTC = new Date().toUTCString();
  this.departureType.lastUpdatedUTC = new Date().toUTCString();

  this.departureTypeSrv.apiUrl = environment.departureType.root;
  this.departureTypeAddSubscription = this.departureTypeSrv.post(this.departureType).subscribe(result => {
  this.onClose();

  // Post Message
  this.messageService.add({severity: 'success', summary: 'Success Message',
  detail: 'Item ' + this.departureType.departureTypeName + ' successfully created.' });

  this.departureType = new DepartureType();
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
  if (this.departureTypeAddSubscription) { this.departureTypeAddSubscription.unsubscribe(); }
  }

}
