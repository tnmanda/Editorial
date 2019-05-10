import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AssignmentType } from '../../../../../../shared/models/admin/types/assignment-type.model';
import { Subscription } from 'rxjs';
import { GlobalHelperService } from '../../../../../../shared/helpers/global-helper.service';
import { AssignmentTypeService } from '../../../../../../shared/services/admin/types/assignment-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-assignment-type-edit-dialog',
  templateUrl: './assignment-type-edit-dialog.component.html',
  styleUrls: ['./assignment-type-edit-dialog.component.css']
})
export class AssignmentTypeEditDialogComponent implements OnInit, OnDestroy {

  @Input() selectedAssignmentType: AssignmentType;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  assignmentTypeEditSubscription: Subscription;

  errorMessage: string;

  constructor(private globalHelperSrv: GlobalHelperService,
    private assignmentTypeSrv: AssignmentTypeService,
    private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.selectedAssignmentType.updatedBy = this.globalHelperSrv.getCurrentUser();
    this.selectedAssignmentType.lastUpdatedUTC = new Date().toUTCString();

    this.assignmentTypeSrv.apiUrl = environment.assignmentType.root;
    this.assignmentTypeEditSubscription = this.assignmentTypeSrv.put(this.selectedAssignmentType).subscribe(result => {
    this.onClose();

    // Post Message
    this.messageService.add({severity: 'success', summary: 'Success Message',
    detail: 'Item ' + this.selectedAssignmentType.assignmentTypeName + ' successfully updated.' });

    this.selectedAssignmentType = new AssignmentType();
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
    if (this.assignmentTypeEditSubscription) { this.assignmentTypeEditSubscription.unsubscribe(); }
  }

}
