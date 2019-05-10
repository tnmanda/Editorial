import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { WorkUnitDuration } from 'src/app/shared/models/admin/work-unit-duration.model';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { WorkUnitDurationService } from 'src/app/shared/services/admin/work-unit-duration.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-work-unit-duration-delete-dialog',
  templateUrl: './work-unit-duration-delete-dialog.component.html',
  styleUrls: ['./work-unit-duration-delete-dialog.component.css']
})
export class WorkUnitDurationDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedWorkUnitDuration: WorkUnitDuration;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  workUnitDurationDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private workUnitDurationSrv: WorkUnitDurationService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.workUnitDurationSrv.apiUrl = environment.workUnitDuration.root;
    this.workUnitDurationDeleteSubscription = this.workUnitDurationSrv.delete(this.selectedWorkUnitDuration.workLockDurationInMinID)
    .subscribe(result => {
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'Work unit duration successfully deleted.' });
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
    if (this.workUnitDurationDeleteSubscription) { this.workUnitDurationDeleteSubscription.unsubscribe(); }
  }

}
