import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { WorkUnitType } from '../../../../../../shared/models/admin/types/work-unit-type.model';
import { Subscription } from 'rxjs';
import { WorkUnitTypeService } from '../../../../../../shared/services/admin/types/work-unit-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-work-unit-type-delete-dialog',
  templateUrl: './work-unit-type-delete-dialog.component.html',
  styleUrls: ['./work-unit-type-delete-dialog.component.css']
})
export class WorkUnitTypeDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedWorkUnitType: WorkUnitType;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  workUnitTypeDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private workUnitTypeSrv: WorkUnitTypeService,
    private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
  this.workUnitTypeSrv.apiUrl = environment.workUnitType.root;
  this.workUnitTypeDeleteSubscription = this.workUnitTypeSrv.delete(this.selectedWorkUnitType.workUnitTypeID).subscribe(result => {
  this.messageService.add({severity: 'success', summary: 'Success Message',
  detail: 'Item ' + this.selectedWorkUnitType.workUnitTypeName + ' successfully deleted.' });
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
    if (this.workUnitTypeDeleteSubscription) { this.workUnitTypeDeleteSubscription.unsubscribe(); }
  }

}
