import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { AlertJob } from 'src/app/shared/models/admin/job-control/alert-job.model';
import { Subscription } from 'rxjs';
import { JobControlService } from 'src/app/shared/services/admin/job-control/job-control.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-job-control-delete-dialog',
  templateUrl: './job-control-delete-dialog.component.html',
  styleUrls: ['./job-control-delete-dialog.component.css']
})
export class JobControlDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedAlertJob: AlertJob;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  errorMessage: string;

  alertJobDeleteSubscription: Subscription;

  constructor(private jobControlSrv: JobControlService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.jobControlSrv.apiUrl = environment.job_control.alert_job.root;
    this.alertJobDeleteSubscription = this.jobControlSrv.delete(this.selectedAlertJob.alertJobsID).subscribe(result => {
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'Job successfully deleted.' });
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
    if (this.alertJobDeleteSubscription) { this.alertJobDeleteSubscription.unsubscribe(); }
  }

}
