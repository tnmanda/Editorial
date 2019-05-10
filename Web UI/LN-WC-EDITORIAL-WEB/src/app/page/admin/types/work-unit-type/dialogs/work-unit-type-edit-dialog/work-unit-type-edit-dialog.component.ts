import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { WorkUnitType } from '../../../../../../shared/models/admin/types/work-unit-type.model';
import { Subscription } from 'rxjs';
import { GlobalHelperService } from '../../../../../../shared/helpers/global-helper.service';
import { WorkUnitTypeService } from '../../../../../../shared/services/admin/types/work-unit-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-work-unit-type-edit-dialog',
  templateUrl: './work-unit-type-edit-dialog.component.html',
  styleUrls: ['./work-unit-type-edit-dialog.component.css']
})
export class WorkUnitTypeEditDialogComponent implements OnInit, OnDestroy {

  @Input() selectedWorkUnitType: WorkUnitType;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  workUnitTypeEditSubscription: Subscription;

  errorMessage: string;

  constructor(private globalHelperSrv: GlobalHelperService,
    private workUnitTypeSrv: WorkUnitTypeService,
    private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
  this.selectedWorkUnitType.updatedBy = this.globalHelperSrv.getCurrentUser();
  this.selectedWorkUnitType.lastUpdatedUTC = new Date().toUTCString();

  this.workUnitTypeSrv.apiUrl = environment.workUnitType.root;
  this.workUnitTypeEditSubscription = this.workUnitTypeSrv.put(this.selectedWorkUnitType).subscribe(result => {
  this.onClose();

  // Post Message
  this.messageService.add({severity: 'success', summary: 'Success Message',
  detail: 'Item ' + this.selectedWorkUnitType.workUnitTypeName + ' successfully updated.' });

  this.selectedWorkUnitType = new WorkUnitType();
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
  if (this.workUnitTypeEditSubscription) { this.workUnitTypeEditSubscription.unsubscribe(); }
  }

}
