import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HumanReviewFormsService } from '../../../../human-review-sdk/human-review-forms.service';
import { HumanReviewFormsControl } from '../../../../human-review-sdk/human-review-forms-control.class';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { wco_environment } from '../../shared/models/wco-environment';
import { Auth } from '../../shared/models/auth.model';
import { TokenService } from '../../shared/services/token.service';
import { AlertsService } from '../../shared/services/alerts.service';
import { Subscription } from 'rxjs';
import { AlertObject } from '../../shared/models/alert-object.model';
import { RecordLock } from '../../shared/models/record-lock.model';
import { GlobalHelperService } from '../../shared/helpers/global-helper.service';
import { AlertsDispositionService } from '../../shared/services/alerts-disposition.service';
import { AlertDisposition } from '../../shared/models/alert-disposition.model';
import { AlertJobsQueueEntity } from '../../shared/models/alert-jobs-queue-entity.model';
import { AlertPostData } from '../../shared/models/alert-post-data.model';

@Component({
  selector: 'hr-alerts-queue',
  templateUrl: './alerts-queue.component.html',
  styleUrls: ['./alerts-queue.component.css']
})
export class AlertsQueueComponent extends HumanReviewFormsControl implements OnInit {

  selectedWorkItemId: string;

  checked = false;
  disabled = false;

  alertsObjectSubscription: Subscription;
  alertsRecordLockSubscription: Subscription;
  alertsRecordUnLockSubscription: Subscription;
  alertDispositionSubscription: Subscription;
  alertJobsQueueEntitySubscription: Subscription;

  alertObject: AlertObject;
  alertJobsQueueEntity: AlertJobsQueueEntity;
  alertDispositions: AlertDisposition[];

  eventListener: any;
  event: any;

  constructor(private route: ActivatedRoute,
              public globalHelperSrv: GlobalHelperService,
              public humanReviewFormsSvc: HumanReviewFormsService,
              private alertsSrv: AlertsService,
              private alertDispositionSrv: AlertsDispositionService,
              private tokenService: TokenService) {
    super(new FormGroup({
      'alertDisposition' : new FormControl('', Validators.required),
    }), humanReviewFormsSvc);
  }

  ngOnInit() {
    this.eventListener = window.addEventListener('message', this.eventMessage.bind(this), false);
  }

  eventMessage(event) {

    if (event.origin === wco_environment.editorial_web) {
      this.event = event;
      if (event.data) {

        const auth = new Auth();
        const jsonToken = JSON.parse(event.data);
        auth.apitokendata = jsonToken.apitokendata;
        auth.hrtokendata = jsonToken.hrtokendata;
        auth.isAuthenticated = jsonToken.isAuthenticated;
        this.tokenService.setAuthModel(wco_environment.api_token, auth);

        this.getAlertDispositions();
        this.getAlertsObjectDetails();
      }
    }
  }

  getAlertDispositions() {
    this.alertDispositionSrv.apiUrl = wco_environment.alerts.disposition.root;
    this.alertDispositionSrv.apiToken = this.tokenService.getTokenFromAuthModel(wco_environment.api_token);
    this.alertDispositionSubscription = this.alertDispositionSrv.getAll().subscribe((items: Array<AlertDisposition>) => {
        this.alertDispositions = items;
    });
  }

  getAlertsObjectDetails() {
    if (this.route.snapshot.params['id']) {
      this.selectedWorkItemId = this.route.snapshot.params['id'];

      this.alertsSrv.apiUrl = wco_environment.alerts.object_by_workitemguid;
      this.alertsSrv.apiToken = this.tokenService.getTokenFromAuthModel(wco_environment.api_token);
      this.alertsObjectSubscription = this.alertsSrv.getAlertsObject(this.selectedWorkItemId)
      .subscribe((item: AlertObject) => {
        this.alertObject = item;
        if (this.alertObject.lockedTo !== null) {
          console.log('test');
          if (this.alertObject.lockedTo.appUserID !== 0) {
            this.checked = true;
          } else {
            this.checked = false;
          }
          if (this.alertObject.lockedTo.appUserID.toString() === this.globalHelperSrv.getCurrentUserID()) {
            this.disabled = false;
          } else {
            this.disabled = true;
          }
        } else {
          this.checked = false;
        }
      });
    }
  }

  onSubmit(formDirective: FormGroupDirective) {
    if (formDirective.valid) {

      this.alertJobsQueueEntity = this.alertObject.alertJobsQueueEntity;
      this.alertJobsQueueEntity.statusID =  <number>this.humanReviewForm.get('alertDisposition').value;
      this.alertJobsQueueEntity.lastUpdatedUTC = new Date().toUTCString();
      this.alertJobsQueueEntity.updatedBy = this.globalHelperSrv.getCurrentUserID();

      const alertPostData = new AlertPostData();
      alertPostData.AlertJobsQueueEntity = this.alertJobsQueueEntity;
      alertPostData.HRToken = this.globalHelperSrv.getHRToken();

      this.alertsSrv.apiUrl = wco_environment.alerts.root;
      this.alertsSrv.apiToken = this.tokenService.getTokenFromAuthModel(wco_environment.api_token);
      this.alertJobsQueueEntitySubscription = this.alertsSrv.put(alertPostData).subscribe(result => {
        this.onCancel();
      });
    }
  }

  onCancel() {
    this.event.source.postMessage('trigger refresh', this.event.origin);
    this.humanReviewForm.reset();
    window.close();
  }

  onChangeLockRecord(event) {
    if (event.checked) {
       // locked
       this.onEntityLock();
    } else {
       // unlocked
       this.onEntityUnlock();
    }

    this.getAlertsObjectDetails();
  }

  onEntityLock() {
    const recordLock = new RecordLock();
    recordLock.workUnitTypeID = 4;
    recordLock.appUserID = this.globalHelperSrv.getCurrentUserID();
    recordLock.idFromWorkUnitsDBTable = this.alertObject.alertJobsQueueEntity.alertJobsQueueEntityID;

    this.alertsSrv.apiUrl = wco_environment.alerts.record_lock.root;
    this.alertsRecordLockSubscription = this.alertsSrv.postLockEntity(recordLock).subscribe(result => {
    });
  }

  onEntityUnlock() {
    const recordLock = new RecordLock();
    recordLock.workUnitTypeID = 4;
    recordLock.appUserID = this.globalHelperSrv.getCurrentUserID();
    recordLock.idFromWorkUnitsDBTable = this.alertObject.alertJobsQueueEntity.alertJobsQueueEntityID;

    this.alertsSrv.apiUrl = wco_environment.alerts.record_lock.root;
    this.alertsRecordUnLockSubscription = this.alertsSrv.deleteUnlockEntity(recordLock).subscribe(result => {
    });

  }

}
