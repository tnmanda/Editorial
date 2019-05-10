import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { PriorityType } from 'src/app/shared/models/investigation/priority-type.model';
import { Subscription } from 'rxjs';
import { PriorityTypeService } from 'src/app/shared/services/investigation/priority-type.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-priority-type-delete-dialog',
  templateUrl: './priority-type-delete-dialog.component.html',
  styleUrls: ['./priority-type-delete-dialog.component.css']
})
export class PriorityTypeDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedPriorityType: PriorityType;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  priorityTypeDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private priorityTypeSrv: PriorityTypeService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.priorityTypeSrv.apiUrl = environment.investigation_management.priority_type.root;
    this.priorityTypeDeleteSubscription = this.priorityTypeSrv.delete(this.selectedPriorityType.priorityTypeID).subscribe(result => {
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'Priority type successfully deleted.' });
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
    if (this.priorityTypeDeleteSubscription) { this.priorityTypeDeleteSubscription.unsubscribe(); }
  }


}
