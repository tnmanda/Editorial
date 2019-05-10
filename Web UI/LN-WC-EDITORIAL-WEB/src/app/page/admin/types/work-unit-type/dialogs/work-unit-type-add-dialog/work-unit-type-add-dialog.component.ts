import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { WorkUnitType } from '../../../../../../shared/models/admin/types/work-unit-type.model';
import { Subscription } from 'rxjs';
import { GlobalHelperService } from '../../../../../../shared/helpers/global-helper.service';
import { WorkUnitTypeService } from '../../../../../../shared/services/admin/types/work-unit-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-work-unit-type-add-dialog',
  templateUrl: './work-unit-type-add-dialog.component.html',
  styleUrls: ['./work-unit-type-add-dialog.component.css']
})
export class WorkUnitTypeAddDialogComponent implements OnInit, OnDestroy {

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  workUnitType: WorkUnitType;
  workUnitTypeAddSubscription: Subscription;

  errorMessage: string;

  constructor(private globalHelperSrv: GlobalHelperService,
    private workUnitTypeSrv: WorkUnitTypeService,
    private messageService: MessageService) { }

  ngOnInit() {
  this.workUnitType = new WorkUnitType();
  }

  onSave() {
  this.workUnitType.createdBy = this.globalHelperSrv.getCurrentUser();
  this.workUnitType.updatedBy = this.globalHelperSrv.getCurrentUser();
  this.workUnitType.dateCreatedUTC = new Date().toUTCString();
  this.workUnitType.lastUpdatedUTC = new Date().toUTCString();

  this.workUnitTypeSrv.apiUrl = environment.workUnitType.root;
  this.workUnitTypeAddSubscription = this.workUnitTypeSrv.post(this.workUnitType).subscribe(result => {
  this.onClose();

  // Post Message
  this.messageService.add({severity: 'success', summary: 'Success Message',
  detail: 'Item ' + this.workUnitType.workUnitTypeName + ' successfully created.' });

  this.workUnitType = new WorkUnitType();
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
    if (this.workUnitTypeAddSubscription) { this.workUnitTypeAddSubscription.unsubscribe(); }
  }

}
