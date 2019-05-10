import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AssignmentType } from '../../../../../../shared/models/admin/types/assignment-type.model';
import { AssignmentTypeService } from '../../../../../../shared/services/admin/types/assignment-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-assignment-type-delete-dialog',
  templateUrl: './assignment-type-delete-dialog.component.html',
  styleUrls: ['./assignment-type-delete-dialog.component.css']
})
export class AssignmentTypeDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedAssignmentType: AssignmentType;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  assignmentTypeDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private assignmentTypeSrv: AssignmentTypeService,
    private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.assignmentTypeSrv.apiUrl = environment.assignmentType.root;
    this.assignmentTypeDeleteSubscription = this.assignmentTypeSrv.delete(this.selectedAssignmentType.assignmentTypeID)
    .subscribe(result => {
    this.messageService.add({severity: 'success', summary: 'Success Message',
    detail: 'Item ' + this.selectedAssignmentType.assignmentTypeName + ' successfully deleted.' });
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
  if (this.assignmentTypeDeleteSubscription) { this.assignmentTypeDeleteSubscription.unsubscribe(); }
  }

}
