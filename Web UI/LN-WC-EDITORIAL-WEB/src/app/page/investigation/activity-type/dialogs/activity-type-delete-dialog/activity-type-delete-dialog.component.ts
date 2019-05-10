import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ActivityType } from 'src/app/shared/models/investigation/activity-type.model';
import { Subscription } from 'rxjs';
import { ActivityTypeService } from 'src/app/shared/services/investigation/activity-type.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-activity-type-delete-dialog',
  templateUrl: './activity-type-delete-dialog.component.html',
  styleUrls: ['./activity-type-delete-dialog.component.css']
})
export class ActivityTypeDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedActivityType: ActivityType;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  activityTypeDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private activityTypeSrv: ActivityTypeService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.activityTypeSrv.apiUrl = environment.investigation_management.activity_type.root;
    this.activityTypeDeleteSubscription = this.activityTypeSrv.delete(this.selectedActivityType.activityTypeID).subscribe(result => {
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'Activity type successfully deleted.' });
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
    if (this.activityTypeDeleteSubscription) { this.activityTypeDeleteSubscription.unsubscribe(); }
  }

}
