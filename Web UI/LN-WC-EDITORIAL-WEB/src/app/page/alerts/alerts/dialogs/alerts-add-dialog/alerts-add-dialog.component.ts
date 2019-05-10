import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { AlertJobs } from 'src/app/shared/models/alerts/alert-jobs.model';
import { Subscription } from 'rxjs';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { TouchSequence } from 'selenium-webdriver';
import { AlertName } from 'src/app/shared/models/alerts/alert-name.model';
import { AlertPriority } from 'src/app/shared/models/alerts/alert-priority.model';
import { AlertStatus } from 'src/app/shared/models/alerts/alert-status.model';
import { AlertJobsQueueData, AlertJobQueuePostData } from 'src/app/shared/models/alerts/alert-job-queue.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-alerts-add-dialog',
  templateUrl: './alerts-add-dialog.component.html',
  styleUrls: ['./alerts-add-dialog.component.css'],
  providers: [MessageService]
})
export class AlertsAddDialogComponent implements OnInit, OnDestroy, OnChanges {

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  selectedAlertJobs: AlertJobs;
  alertJobsQueueData: AlertJobsQueueData;

  alertJobs: AlertJobs[];
  sourceAlertNames: AlertName[];
  targetAlertNames: AlertName[];
  alertPriorities: AlertPriority[];
  alertStatus: AlertStatus[];

  alertJobAllSubscription: Subscription;
  alertPriorityAllSubscription: Subscription;
  alertStatusAllSubscription: Subscription;
  alertNameSubscription: Subscription;
  alertJobQueueAddSubscription: Subscription;

  isSubmitted = false;
  isError = true;

  alertsJobForm: FormGroup;

  errorMessage: string;

  // convenience getter for easy access to form fields
  get f() { return this.alertsJobForm.controls; }

  constructor(private globalHelperSrv: GlobalHelperService,
              private datePipe: DatePipe,
              private alertSrv: AlertsService,
              private messageService: MessageService) { }

  ngOnInit() {

    this.targetAlertNames = [];
    this.getAlertJobs();
    this.getAlertPriorities();
    this.getAlertStatus();
  }

  ngOnChanges() {
    this.alertsJobForm = new FormGroup ({
      'alertsJob' : new FormControl('', Validators.required),
      'priority' : new FormControl('', Validators.required),
      'dueDateUTC' : new FormControl('', Validators.required)
    });
  }

  getAlertJobs() {
    this.alertSrv.apiUrl = environment.alerts_management.alert_job.root;
    this.alertJobAllSubscription = this.alertSrv.getAlertJobs().subscribe((items: Array<AlertJobs>) => {
      this.alertJobs = items;
    });
  }

  getAlertPriorities() {
    this.alertSrv.apiUrl = environment.alerts_management.alert_job_queue.priorities;
    this.alertPriorityAllSubscription = this.alertSrv.getAlertPriorities().subscribe((items: Array<AlertPriority>) => {
      this.alertPriorities = items;
    });
  }

  getAlertStatus() {
    this.alertSrv.apiUrl = environment.alerts_management.alert_job_queue.status;
    this.alertStatusAllSubscription = this.alertSrv.getAlertStatus().subscribe((items: Array<AlertStatus>) => {
      this.alertStatus = items;
    });
  }

  onAlertJobChange(alertJobs: AlertJobs) {
    this.targetAlertNames = [];
    if (alertJobs) {
      this.alertSrv.apiUrl = environment.alerts_management.alert_name.by_alert_job_id;
      this.alertNameSubscription = this.alertSrv.getAlertNames(alertJobs.alertJobsID.toString()).
      subscribe((items: Array<AlertName>) => {
        this.sourceAlertNames = items;
        console.log(this.sourceAlertNames);
      });
    }
  }

  onSave(alertsJobForm) {
    this.isSubmitted = true;

    if (alertsJobForm.valid) {

      if (this.targetAlertNames.length === 0) {
        this.isError = false;
      } else {
        this.alertJobsQueueData = alertsJobForm.value;
        this.alertJobsQueueData.alertJobsID = this.alertJobsQueueData.alertsJob.alertJobsID;
        this.alertJobsQueueData.priorityCollectionItemID = this.alertJobsQueueData.priority.collectionItemID;
        this.alertJobsQueueData.statusCollectionItemID = 1047;
        this.alertJobsQueueData.dueDateUTC = this.datePipe.transform(this.alertJobsQueueData.dueDateUTC, 'MM/dd/yyyy');
        this.alertJobsQueueData.createdBy = this.globalHelperSrv.getCurrentUserID();
        this.alertJobsQueueData.updatedBy = this.globalHelperSrv.getCurrentUserID();
        this.alertJobsQueueData.dateCreatedUTC = new Date().toUTCString();
        this.alertJobsQueueData.lastUpdatedUTC = new Date().toUTCString();
        this.alertJobsQueueData.alertsJob = null;
        this.alertJobsQueueData.priority = null;
        this.alertJobsQueueData.status = null;

        const alertJobQueuePostData = new AlertJobQueuePostData();
        alertJobQueuePostData.alertJobsQueue = this.alertJobsQueueData;
        alertJobQueuePostData.alertNames = this.targetAlertNames;
        alertJobQueuePostData.HRToken = this.globalHelperSrv.getHRToken();

        this.alertSrv.apiUrl = environment.alerts_management.alert_job_queue.root;
        this.alertJobQueueAddSubscription = this.alertSrv.post(alertJobQueuePostData).subscribe(result => {
          this.onClose();

          // Post Message
          this.messageService.add({severity: 'success', summary: 'Success Message',
          detail: 'Alert job queue successfully created.' });

          this.alertJobsQueueData = new AlertJobsQueueData();
        }, error => { this.errorMessage = error; });
      }

    }
  }

  onClose() {
    this.isSubmitted = false;
    this.alertsJobForm.reset();
    this.displayChange.emit(false);
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  onErrorMessageClose() {
    this.isError = true;
  }

  ngOnDestroy(): void {
    if (this.alertJobAllSubscription) { this.alertJobAllSubscription.unsubscribe(); }
    if (this.alertPriorityAllSubscription) { this.alertPriorityAllSubscription.unsubscribe(); }
    if (this.alertStatusAllSubscription) { this.alertStatusAllSubscription.unsubscribe(); }
    if (this.alertNameSubscription) { this.alertNameSubscription.unsubscribe(); }
    if (this.alertJobQueueAddSubscription) { this.alertJobQueueAddSubscription.unsubscribe(); }
  }

}
