import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { DepartureType } from '../../../../../../shared/models/admin/types/departure-type.model';
import { Subscription } from 'rxjs';
import { DepartureTypeService } from '../../../../../../shared/services/admin/types/departure-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-departure-type-delete-dialog',
  templateUrl: './departure-type-delete-dialog.component.html',
  styleUrls: ['./departure-type-delete-dialog.component.css']
})
export class DepartureTypeDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedDepartureType: DepartureType;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  departureTypeDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private departureTypeSrv: DepartureTypeService,
    private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
  this.departureTypeSrv.apiUrl = environment.departureType.root;
  this.departureTypeDeleteSubscription = this.departureTypeSrv.delete(this.selectedDepartureType.departureTypeID).subscribe(result => {
  this.messageService.add({severity: 'success', summary: 'Success Message',
  detail: 'Item ' + this.selectedDepartureType.departureTypeName + ' successfully deleted.' });
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
    if (this.departureTypeDeleteSubscription) { this.departureTypeDeleteSubscription.unsubscribe(); }
  }


}
