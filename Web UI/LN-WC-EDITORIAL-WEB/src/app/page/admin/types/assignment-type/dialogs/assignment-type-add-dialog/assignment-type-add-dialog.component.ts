import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AssignmentType } from '../../../../../../shared/models/admin/types/assignment-type.model';
import { Subscription } from 'rxjs';
import { GlobalHelperService } from '../../../../../../shared/helpers/global-helper.service';
import { AssignmentTypeService } from '../../../../../../shared/services/admin/types/assignment-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-assignment-type-add-dialog',
  templateUrl: './assignment-type-add-dialog.component.html',
  styleUrls: ['./assignment-type-add-dialog.component.css']
})
export class AssignmentTypeAddDialogComponent implements OnInit, OnDestroy {

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  assignmentType: AssignmentType;
  assignmentTypeAddSubscription: Subscription;

  errorMessage: string;

  constructor(private globalHelperSrv: GlobalHelperService,
    private assignmentTypeSrv: AssignmentTypeService,
    private messageService: MessageService) { }

  ngOnInit() {
  this.assignmentType = new AssignmentType();
  }

  onSave() {
    this.assignmentType.createdBy = this.globalHelperSrv.getCurrentUser();
    this.assignmentType.updatedBy = this.globalHelperSrv.getCurrentUser();
    this.assignmentType.dateCreatedUTC = new Date().toUTCString();
    this.assignmentType.lastUpdatedUTC = new Date().toUTCString();

    this.assignmentTypeSrv.apiUrl = environment.assignmentType.root;
    this.assignmentTypeAddSubscription = this.assignmentTypeSrv.post(this.assignmentType).subscribe(result => {
    this.onClose();

    // Post Message
    this.messageService.add({severity: 'success', summary: 'Success Message',
    detail: 'Item ' + this.assignmentType.assignmentTypeName + ' successfully created.' });

    this.assignmentType = new AssignmentType();
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
    if (this.assignmentTypeAddSubscription) { this.assignmentTypeAddSubscription.unsubscribe(); }
  }

}
