import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertJobQueue } from 'src/app/shared/models/alerts/alert-job-queue.model';
import { Subscription } from 'rxjs';
import { MenuItem, MessageService } from 'primeng/api';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-alerts-list',
  templateUrl: './alerts-list.component.html',
  styleUrls: ['./alerts-list.component.css'],
  providers: [MessageService]
})
export class AlertsListComponent implements OnInit, OnDestroy {

  selectedAlertJobQueue: AlertJobQueue;
  alertJobQueueAllSubscription: Subscription;
  alertJobQueueDeleteSubscription: Subscription;

  alertJobQueues: AlertJobQueue[];
  public items: MenuItem[];
  home: MenuItem;

  displayAddDialog = false;
  displayDeleteDialog = false;

  constructor(private alertSrv: AlertsService) { }

  ngOnInit() {
    this.items = [
      {label: 'Alerts', url: 'alerts-management'},
      {label: 'Alerts Management', url: 'alerts-list'},
    ];

    this.home = {icon: 'fa fa-home', url: 'home'};

    this.getAlertJobQueues();
  }

  getAlertJobQueues() {
    this.alertSrv.apiUrl = environment.alerts_management.alert_job_queue.nav;
    this.alertJobQueueAllSubscription = this.alertSrv.getAlertJobQueues().subscribe((items: Array<AlertJobQueue>) => {
        this.alertJobQueues = items;
    });
  }

  showAddDialog() {
    this.displayAddDialog = true;
  }

  onAddDialogClose(event) {
    this.displayAddDialog = event;
    this.getAlertJobQueues();
  }


  showDeleteDialog(alertJobsQueueID) {
    this.displayDeleteDialog = true;
    this.alertSrv.apiUrl = environment.alerts_management.alert_job_queue.root;
    this.alertJobQueueDeleteSubscription = this.alertSrv.getSingle(alertJobsQueueID).subscribe((item: AlertJobQueue) => {
        this.selectedAlertJobQueue = item;
    });
  }

  onDeleteDialogClose(event) {
    this.displayDeleteDialog = event;
    this.getAlertJobQueues();
  }

  ngOnDestroy(): void {
    if (this.alertJobQueueAllSubscription) { this.alertJobQueueAllSubscription.unsubscribe(); }
    if (this.alertJobQueueDeleteSubscription) { this.alertJobQueueDeleteSubscription.unsubscribe(); }
  }

}
