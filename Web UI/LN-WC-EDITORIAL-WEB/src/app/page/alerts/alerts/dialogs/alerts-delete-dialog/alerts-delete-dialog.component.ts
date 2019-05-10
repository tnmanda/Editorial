import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { AlertJobQueue } from 'src/app/shared/models/alerts/alert-job-queue.model';
import { Subscription } from 'rxjs';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-alerts-delete-dialog',
  templateUrl: './alerts-delete-dialog.component.html',
  styleUrls: ['./alerts-delete-dialog.component.css']
})
export class AlertsDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedAlertJobQueue: AlertJobQueue;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  alertJobQueueDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private alertSrv: AlertsService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.alertSrv.apiUrl = environment.alerts_management.alert_job_queue.root;
    this.alertJobQueueDeleteSubscription = this.alertSrv.delete(this.selectedAlertJobQueue.alertJobsQueueID).subscribe(result => {
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'Alert job queue successfully deleted.' });
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
    if (this.alertJobQueueDeleteSubscription) { this.alertJobQueueDeleteSubscription.unsubscribe(); }
  }

}
