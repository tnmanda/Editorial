import { Component, OnInit } from '@angular/core';
import { InvestigationEntityObject } from '../../../shared/models/investigation-entity-object.model';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Subscription } from 'rxjs';
import { wco_environment } from '../../../shared/models/wco-environment';
import { ActivatedRoute } from '@angular/router';
import { Auth } from '../../../shared/models/auth.model';
import { TokenService } from '../../../shared/services/token.service';
import { InvestigationService } from '../../../shared/services/investigation.service';
import { PriorityTypeService } from '../../../shared/services/priority-type.service';
import { PriorityType } from '../../../shared/models/priority-type.model';
import { HumanReviewFormsControl } from '../../../../../human-review-sdk/human-review-forms-control.class';
import { HumanReviewFormsService } from '../../../../../human-review-sdk/human-review-forms.service';
import { InvestigationStatusService } from '../../../shared/services/investigation-status.service';
import { InvestigationStatus } from '../../../shared/models/investigation-status.model';
import { InvestigationDispositionsService } from '../../../shared/services/investigation-dispositions.service';
import { InvestigationDispositions } from '../../../shared/models/investigation-dispositions.model';
import { CountryService } from '../../../shared/services/country.service';
import { Country } from '../../../shared/models/country.model';
import { FunctionTypeService } from '../../../shared/services/function-type.service';
import { FunctionType } from '../../../shared/models/function-type.model';
import { Investigation, InvestigationPostData } from '../../../shared/models/investigation.model';
import { GlobalHelperService } from '../../../shared/helpers/global-helper.service';
import { InvestigationNote } from '../../../shared/models/investigation-note.model';
import { Entity } from '../../../shared/models/entity.model';
import { InvestigationActivityService } from '../../../shared/services/investigation-activity.service';
import { InvestigationActivity } from '../../../shared/models/investigation-activity.model';
import { MatDialog } from '@angular/material';
import { InvestigationNoteListDialogComponent } from '../dialogs/investigation-note-list-dialog/investigation-note-list-dialog.component';
import { ActivityLogsDialogComponent } from '../dialogs/activity-logs-dialog/activity-logs-dialog.component';
import { SendEmailDialogComponent } from '../dialogs/send-email-dialog/send-email-dialog.component';
import { InvestigationEmail } from '../../../shared/models/investigation-email.model';
import { RecordLock } from '../../../shared/models/record-lock.model';

@Component({
  selector: 'hr-investigation-entity',
  templateUrl: './investigation-entity.component.html',
  styleUrls: ['./investigation-entity.component.css']
})
export class InvestigationEntityComponent extends HumanReviewFormsControl implements OnInit {

  selectedWorkItemId: string;

  lockRecordColor = 'color';
  checked = false;
  disabled = false;

  invEntityObject: InvestigationEntityObject;
  invEntityForm: FormGroup;
  selectedInvestigation: Investigation;

  investigationEntityObjectSubscription: Subscription;
  priorityTypeSubscription: Subscription;
  statusSubscription: Subscription;
  dispositionSubscription: Subscription;
  countrySubscription: Subscription;
  investigationSubscription: Subscription;
  investigationActivitySubscription: Subscription;
  investigationRecordLockSubscription: Subscription;
  investigationRecordUnlockSubscription: Subscription;

  priorityTypes: PriorityType[];
  statuses: InvestigationStatus[];
  dispositions: InvestigationDispositions[];
  countries: Country[];
  functionTypes: FunctionType[];

  eventListener: any;
  event: any;

  investigationForm: FormGroup;

  invReason: string;

  constructor(private route: ActivatedRoute,
              public dialog: MatDialog,
              private globalHelperSrv: GlobalHelperService,
              private investigationSrv: InvestigationService,
              private priorityTypeSrv: PriorityTypeService,
              private invStatusSrv: InvestigationStatusService,
              private invDispositionSrv: InvestigationDispositionsService,
              private countriesSrv: CountryService,
              private functionTypeSrv: FunctionTypeService,
              private invActivitySrv: InvestigationActivityService,
              public humanReviewFormsSvc: HumanReviewFormsService,
              private tokenService: TokenService) {
                super(new FormGroup({
                  'priority' : new FormControl('', Validators.required),
                  'status' : new FormControl('', Validators.required),
                  'countryOfResearch' : new FormControl('', Validators.required),
                  'categoryOfResearch' : new FormControl('', Validators.required),
                  'disposition' : new FormControl('', Validators.required),
                  'note' : new FormControl('')
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
        this.getPriorityTypes();
        this.getStatus();
        this.getDispositions();
        this.getCountries();
        this.getFunctions();
        this.getInvestigationEntityDetails();
      }
    }
  }

  getPriorityTypes() {
    this.priorityTypeSrv.apiUrl = wco_environment.investigation.priority_type.root;
    this.priorityTypeSrv.apiToken = this.tokenService.getTokenFromAuthModel(wco_environment.api_token);
    this.priorityTypeSubscription = this.priorityTypeSrv.getAll().subscribe((items: Array<PriorityType>) => {
        this.priorityTypes = items;
    });
  }

  getStatus() {
    this.invStatusSrv.apiUrl = wco_environment.investigation.status.root;
    this.invStatusSrv.apiToken = this.tokenService.getTokenFromAuthModel(wco_environment.api_token);
    this.priorityTypeSubscription = this.invStatusSrv.getAll().subscribe((items: Array<InvestigationStatus>) => {
        this.statuses = items;
        console.log(this.statuses);
    });
  }

  getDispositions() {
    this.invDispositionSrv.apiUrl = wco_environment.investigation.disposition.root;
    this.invDispositionSrv.apiToken = this.tokenService.getTokenFromAuthModel(wco_environment.api_token);
    this.dispositionSubscription = this.invDispositionSrv.getAll().subscribe((items: Array<InvestigationDispositions>) => {
        this.dispositions = items;
    });
  }

  getCountries() {
    this.countriesSrv.apiUrl = wco_environment.investigation.country.root;
    this.countriesSrv.apiToken = this.tokenService.getTokenFromAuthModel(wco_environment.api_token);
    this.countrySubscription = this.countriesSrv.getAll().subscribe((items: Array<Country>) => {
        this.countries = (items || []).sort((a: Country, b: Country) => a.countryName < b.countryName ? -1 : 1);
    });
  }

  getFunctions() {
    this.functionTypeSrv.apiUrl = wco_environment.investigation.function_type.root;
    this.functionTypeSrv.apiToken = this.tokenService.getTokenFromAuthModel(wco_environment.api_token);
    this.countrySubscription = this.functionTypeSrv.getAll().subscribe((items: Array<FunctionType>) => {
        this.functionTypes = items;
    });
  }

  getInvestigationEntityDetails() {
    if (this.route.snapshot.params['id']) {
      this.selectedWorkItemId = this.route.snapshot.params['id'];
      this.investigationSrv.apiUrl = wco_environment.investigation.entity_by_workitemguid;
      this.investigationSrv.apiToken = this.tokenService.getTokenFromAuthModel(wco_environment.api_token);
      this.investigationEntityObjectSubscription = this.investigationSrv.getInvestigationEntityObject(this.selectedWorkItemId)
      .subscribe((item: InvestigationEntityObject) => {
        this.invEntityObject = item;

        if (this.invEntityObject.locks !== null) {
          if (this.invEntityObject.locks.appUserID !== '0') {
            this.checked = true;
          } else {
            this.checked = false;
          }
          if (this.invEntityObject.locks.appUserID.toString() === this.globalHelperSrv.getCurrentUserID()) {
            this.disabled = false;
          } else {
            this.disabled = true;
          }
        } else {
          this.checked = false;
        }

        this.selectedInvestigation = this.invEntityObject.investigation;
        if (this.invEntityObject.entity === null) {
          this.invEntityObject.entity = new Entity();
        }

        // tslint:disable-next-line:max-line-length
        this.invEntityObject.investigation.dateCreatedUTC = new Date(this.invEntityObject.investigation.dateCreatedUTC).toLocaleString();
        this.invEntityObject.investigation.lastUpdatedUTC = new Date(this.invEntityObject.investigation.lastUpdatedUTC).toLocaleString();
        this.invEntityObject.entity.dateUpdated = new Date(this.invEntityObject.entity.dateUpdated).toLocaleString();

        this.setInvestigationReason();

        this.generateFormData();

        // save investigation activity (View)
        this.submitInvestigationActivity(1);
      });
    }
  }

  setInvestigationReason() {
    // tslint:disable-next-line:max-line-length
    this.invReason = 'Reason: ' + (typeof this.invEntityObject.reason.Reason === 'undefined' ? '' : this.invEntityObject.reason.Reason) + '\n';
    // tslint:disable-next-line:max-line-length
    this.invReason = this.invReason + 'Investigation Case: ' + (typeof this.invEntityObject.investigation.investigationID === 'undefined' ? '' : this.invEntityObject.investigation.investigationID) + '\n';
    // tslint:disable-next-line:max-line-length
    this.invReason = this.invReason + 'Country: ' + (typeof this.invEntityObject.reason.Country === 'undefined' ? '' : this.invEntityObject.reason.Country) + '\n';
    // tslint:disable-next-line:max-line-length
    this.invReason = this.invReason + 'Approximate Age: ' + (typeof this.invEntityObject.reason.Age === 'undefined' ? '' : this.invEntityObject.reason.Age) + '\n';
    // tslint:disable-next-line:max-line-length
    this.invReason = this.invReason + 'Other Info: ' + (typeof this.invEntityObject.reason.OtherInfo === 'undefined' ? '' : this.invEntityObject.reason.OtherInfo) + '\n';
    // tslint:disable-next-line:max-line-length
    this.invReason = this.invReason + 'Comments: ' + (typeof this.invEntityObject.reason.Comments === 'undefined' ? '' : this.invEntityObject.reason.Comments) + '\n';
    // tslint:disable-next-line:max-line-length
    this.invReason = this.invReason + 'Created Time: ' + (typeof this.invEntityObject.reason.Created === 'undefined' ? '' : this.invEntityObject.reason.Created) + '\n';
    // tslint:disable-next-line:max-line-length
    this.invReason = this.invReason + 'DOB: ' + (typeof this.invEntityObject.reason.DOB === 'undefined' ? '' : this.invEntityObject.reason.DOB) + '\n';
  }

  generateFormData() {
    if (this.invEntityObject) {

      this.humanReviewForm.setValue({
          priority: this.invEntityObject.investigation.priorityTypeID,
          status: this.invEntityObject.investigation.investigationStatusID,
          countryOfResearch: this.invEntityObject.investigation.countryID,
          categoryOfResearch: this.invEntityObject.investigation.functionTypeID,
          disposition: this.invEntityObject.investigation.investigationDispositionsID,
          note: ''
      });
    }
  }

  openActivityLogsDialog(): void {
    const dialogRef = this.dialog.open(ActivityLogsDialogComponent, {
          width: '800px',
          data: this.invEntityObject.activity
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  onSubmit(formDirective: FormGroupDirective) {
    console.log(formDirective);
    if (formDirective.valid) {

      let investigation = new Investigation();
      investigation = this.selectedInvestigation;
      investigation = this.invEntityObject.investigation;
      investigation.priorityTypeID = <number>this.humanReviewForm.get('priority').value;
      investigation.investigationStatusID = <number>this.humanReviewForm.get('status').value;
      // tslint:disable-next-line:max-line-length
      investigation.investigationDispositionsID = <number>this.humanReviewForm.get('disposition').value;
      investigation.countryID = <number>this.humanReviewForm.get('countryOfResearch').value;
      investigation.functionTypeID = <number>this.humanReviewForm.get('categoryOfResearch').value;
      investigation.updatedBy = this.globalHelperSrv.getCurrentUserID();
      investigation.lastUpdatedUTC = new Date().toUTCString();

      const investigationNote = new InvestigationNote();
      investigationNote.investigationID = this.invEntityObject.investigation.investigationID;
      investigationNote.noteText = <string>this.humanReviewForm.get('note').value;
      investigationNote.createdBy = this.globalHelperSrv.getCurrentUserID();
      investigationNote.dateCreatedUTC = new Date().toUTCString();
      investigationNote.updatedBy = this.globalHelperSrv.getCurrentUserID();
      investigationNote.lastUpdatedUTC = new Date().toUTCString();

      const investigationPostData = new InvestigationPostData;
      investigationPostData.investigation = investigation;
      investigationPostData.HRToken = this.globalHelperSrv.getHRToken();
      investigationPostData.InvestigationNote = investigationNote;

      console.log(investigationPostData);

      this.investigationSrv.apiUrl = wco_environment.investigation.root;
      this.investigationSrv.apiToken = this.tokenService.getTokenFromAuthModel(wco_environment.api_token);
      this.investigationSubscription = this.investigationSrv.put(investigationPostData).subscribe(result => {
        if (investigation.investigationStatusID === 6) {
          const invEmail = new InvestigationEmail();
          invEmail.recipientEmail = investigation.requestedBy;
          invEmail.appUserID = Number.parseInt(this.globalHelperSrv.getCurrentUserID());
          invEmail.indexFromWorkTable = investigation.investigationID;

          const dialogRef = this.dialog.open(SendEmailDialogComponent, {
                width: '800px',
                data: invEmail
          });

          dialogRef.afterClosed().subscribe(dialogResult => {
            this.onCancel();
          });
        } else {
          this.onCancel();
        }

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
       // save investigation activity (Locked)
       this.submitInvestigationActivity(9);
       this.onEntityLock();
    } else {
       // save investigation activity (Unlocked)
       this.submitInvestigationActivity(10);
       this.onEntityUnlock();
    }
  }

  submitInvestigationActivity(activityTypeID: number) {
    // save investigation activity (Locked)
    const invActivity = new InvestigationActivity();
    invActivity.investigationID = this.invEntityObject.investigation.investigationID;
    invActivity.activityTypeID = activityTypeID,
    invActivity.appUserID = Number.parseInt(this.globalHelperSrv.getCurrentUserID());
    invActivity.fromValue = '';
    invActivity.toValue = '';
    invActivity.createdBy = this.globalHelperSrv.getCurrentUser();
    invActivity.dateCreatedUTC = new Date().toUTCString();
    invActivity.updatedBy = this.globalHelperSrv.getCurrentUser();
    invActivity.lastUpdatedUTC = new Date().toUTCString();

    this.invActivitySrv.apiUrl = wco_environment.investigation.activity;
    this.invActivitySrv.apiToken = this.tokenService.getTokenFromAuthModel(wco_environment.api_token);
    this.investigationActivitySubscription = this.invActivitySrv.post(invActivity).subscribe(result => {
      console.log(result);
    });
  }

  onEntityLock() {
    const recordLock = new RecordLock();
    recordLock.workUnitTypeID = 3;
    recordLock.appUserID = this.globalHelperSrv.getCurrentUserID();
    recordLock.idFromWorkUnitsDBTable = this.invEntityObject.investigation.investigationID;

    this.investigationSrv.apiUrl = wco_environment.alerts.record_lock.root;
    this.investigationRecordLockSubscription = this.investigationSrv.postLockEntity(recordLock).subscribe(result => {
    });
  }

  onEntityUnlock() {
    const recordLock = new RecordLock();
    recordLock.workUnitTypeID = 3;
    recordLock.appUserID = this.globalHelperSrv.getCurrentUserID();
    recordLock.idFromWorkUnitsDBTable =  this.invEntityObject.investigation.investigationID;

    this.investigationSrv.apiUrl = wco_environment.alerts.record_lock.root;
    this.investigationRecordUnlockSubscription = this.investigationSrv.deleteUnlockEntity(recordLock).subscribe(result => {
    });
  }

}
