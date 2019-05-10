import { Component, OnInit, OnDestroy, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { AlertJob } from 'src/app/shared/models/admin/job-control/alert-job.model';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/shared/models/admin/country.model';
import { Team } from 'src/app/shared/models/admin/team.model';
import { Encoding } from 'src/app/shared/models/admin/job-control/encoding.model';
import { AlertSourceType } from 'src/app/shared/models/admin/job-control/alert-source-type.model';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { JobControlService } from 'src/app/shared/services/admin/job-control/job-control.service';
import { CountryService } from 'src/app/shared/services/admin/country.service';
import { TeamService } from 'src/app/shared/services/admin/team.service';
import { AlertSourceTypeService } from 'src/app/shared/services/admin/job-control/alert-source-type.service';
import { EncodingService } from 'src/app/shared/services/admin/job-control/encoding.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-job-control-edit-dialog',
  templateUrl: './job-control-edit-dialog.component.html',
  styleUrls: ['./job-control-edit-dialog.component.css']
})
export class JobControlEditDialogComponent implements OnInit, OnDestroy, OnChanges {

  @Input() selectedAlertJob: AlertJob;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  isSubmitted = false;

  countries: Country[];
  teams: Team[];
  alertSourceTypes: AlertSourceType[];
  encodings: Encoding[];

  alertJobEditSubscription: Subscription;
  countryAllSubscription: Subscription;
  teamAllSubscription: Subscription;
  alertSourceTypeAllSubscription: Subscription;
  encodingAllSubscription: Subscription;

  errorMessage: string;

  alertJobForm: FormGroup;

  // convenience getter for easy access to form fields
  get f() { return this.alertJobForm.controls; }

  constructor(private globalHelperSrv: GlobalHelperService,
              private jobControlSrv: JobControlService,
              private countrySrv: CountryService,
              private teamSrv: TeamService,
              private alertSourceTypeSrv: AlertSourceTypeService,
              private encodingSrv: EncodingService,
              private messageService: MessageService) { }

  ngOnInit() {
    // this.generateForm();

    this.getCountries();
    this.getTeams();
    this.getSourceTypes();
    this.getEncodings();
  }

  ngOnChanges(): void {
    if (this.selectedAlertJob) {
      this.generateForm();
      this.alertJobForm.setValue({
          team: this.selectedAlertJob.team,
          jobName: this.selectedAlertJob.jobName,
          jobAbbrev: this.selectedAlertJob.jobAbbrev,
          jobDescription: this.selectedAlertJob.jobDescription,
          jobSpecialInstructions: this.selectedAlertJob.jobSpecialInstructions,
          jobComments: this.selectedAlertJob.jobComments,
          alertSourceType: this.selectedAlertJob.alertSourceType,
          country: this.selectedAlertJob.country,
          jobScrapperClassName: this.selectedAlertJob.jobScrapperClassName,
          jobScrapperAssemble: this.selectedAlertJob.jobScrapperAssemble,
          encoding: this.selectedAlertJob.encoding,
          regex: this.selectedAlertJob.regex,
          regexForPages: this.selectedAlertJob.regexForPages,
          jobURL: this.selectedAlertJob.jobURL,
          priorityCode: this.selectedAlertJob.priorityCode,
          isActive: this.selectedAlertJob.isActive,
          isPreventDeletions: this.selectedAlertJob.isPreventDeletions,
          isUseProxy: this.selectedAlertJob.isUseProxy,
          isCriticalJob: this.selectedAlertJob.isCriticalJob,
          isWithLookUpID: this.selectedAlertJob.isWithLookUpID,
          isShowOnDynamicDisplay: this.selectedAlertJob.isShowOnDynamicDisplay,
          isUserTermsFilter: this.selectedAlertJob.isUserTermsFilter
      });
    }
  }

  generateForm() {
    this.alertJobForm = new FormGroup ({
      'team' : new FormControl('', Validators.required),
      'jobName' : new FormControl('', Validators.required),
      'jobAbbrev' : new FormControl('', Validators.required),
      'jobDescription' : new FormControl('', Validators.required),
      'jobSpecialInstructions' : new FormControl('', Validators.required),
      'jobComments' : new FormControl('', Validators.required),
      'alertSourceType' : new FormControl('', Validators.required),
      'country' : new FormControl('', Validators.required),
      'jobScrapperClassName' : new FormControl('', Validators.required),
      'jobScrapperAssemble' : new FormControl('', Validators.required),
      'encoding' : new FormControl('', Validators.required),
      'regex' : new FormControl('', Validators.required),
      'regexForPages' : new FormControl('', Validators.required),
      'jobURL' : new FormControl('', Validators.required),
      'priorityCode' : new FormControl('', Validators.required),
      'isActive' : new FormControl(false, Validators.required),
      'isPreventDeletions' : new FormControl(false, Validators.required),
      'isUseProxy' : new FormControl(false, Validators.required),
      'isCriticalJob' : new FormControl(false, Validators.required),
      'isWithLookUpID' : new FormControl(false, Validators.required),
      'isShowOnDynamicDisplay' : new FormControl(false, Validators.required),
      'isUserTermsFilter' : new FormControl(false, Validators.required)
    });
  }

  getCountries() {
    this.countrySrv.apiUrl = environment.country.root;
    this.countryAllSubscription = this.countrySrv.getAll().subscribe((items: Array<Country>) => {
      this.countries = (items || []).sort((a: Country, b: Country) => a.countryName < b.countryName ? -1 : 1);
    });
  }

  getTeams() {
    this.teamSrv.apiUrl = environment.team.noref;
    this.teamAllSubscription = this.teamSrv.getAll().subscribe((items: Array<Team>) => {
      this.teams = items;
      console.log(this.teams);
    });
  }

  getSourceTypes() {
    this.alertSourceTypeSrv.apiUrl = environment.job_control.alert_source_type.root;
    this.alertSourceTypeAllSubscription = this.alertSourceTypeSrv.getAll().subscribe((items: Array<AlertSourceType>) => {
      this.alertSourceTypes = items;
    });
  }

  getEncodings() {
    this.encodingSrv.apiUrl = environment.job_control.encoding.root;
    this.alertSourceTypeAllSubscription = this.encodingSrv.getAll().subscribe((items: Array<Encoding>) => {
      this.encodings = items;
    });
  }

  onSave(formDirective: FormGroupDirective) {
    this.isSubmitted = true;

    if (formDirective.valid) {
      const alertJob = new AlertJob();
      alertJob.alertJobsID = this.selectedAlertJob.alertJobsID;
      alertJob.teamID = <number>this.alertJobForm.get('team').value.teamID;
      alertJob.jobName = <string>this.alertJobForm.get('jobName').value;
      alertJob.jobAbbrev = <string>this.alertJobForm.get('jobAbbrev').value;
      alertJob.jobDescription = <string>this.alertJobForm.get('jobDescription').value;
      alertJob.jobSpecialInstructions = <string>this.alertJobForm.get('jobSpecialInstructions').value;
      alertJob.jobComments = <string>this.alertJobForm.get('jobComments').value;
      alertJob.alertSourceTypeID = <number>this.alertJobForm.get('alertSourceType').value.alertSourceTypeID;
      alertJob.countryID = <number>this.alertJobForm.get('country').value.countryID;
      alertJob.jobScrapperClassName = <string>this.alertJobForm.get('jobScrapperClassName').value;
      alertJob.jobScrapperAssemble = <string>this.alertJobForm.get('jobScrapperAssemble').value;
      alertJob.encoding = <string>this.alertJobForm.get('encoding').value.encodingName;
      alertJob.regex = <string>this.alertJobForm.get('regex').value;
      alertJob.regexForPages = <string>this.alertJobForm.get('regexForPages').value;
      alertJob.jobURL = <string>this.alertJobForm.get('jobURL').value;
      alertJob.priorityCode = <number>this.alertJobForm.get('priorityCode').value;
      alertJob.isActive = <boolean>this.alertJobForm.get('isActive').value;
      alertJob.isPreventDeletions = <boolean>this.alertJobForm.get('isPreventDeletions').value;
      alertJob.isUseProxy = <boolean>this.alertJobForm.get('isUseProxy').value;
      alertJob.isCriticalJob = <boolean>this.alertJobForm.get('isCriticalJob').value;
      alertJob.isWithLookUpID = <boolean>this.alertJobForm.get('isWithLookUpID').value;
      alertJob.isShowOnDynamicDisplay = <boolean>this.alertJobForm.get('isShowOnDynamicDisplay').value;
      alertJob.isUserTermsFilter = <boolean>this.alertJobForm.get('isUserTermsFilter').value;
      alertJob.createdBy = this.selectedAlertJob.createdBy;
      alertJob.dateCreatedUTC = this.selectedAlertJob.dateCreatedUTC;
      alertJob.updatedBy = this.globalHelperSrv.getCurrentUser();
      alertJob.lastUpdatedUTC = new Date().toUTCString();

      this.jobControlSrv.apiUrl = environment.job_control.alert_job.root;
      this.alertJobEditSubscription = this.jobControlSrv.put(alertJob).subscribe(result => {

      // Post Message
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'Job successfully updated.' });

      formDirective.reset();
      this.onClose();
    }, error => { this.errorMessage = error; });
    }
  }

  onClose() {
    this.alertJobForm.reset();
    this.displayChange.emit(false);
    this.selectedAlertJob = null;
    this.isSubmitted = false;
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.alertJobEditSubscription) { this.alertJobEditSubscription.unsubscribe(); }
    if (this.countryAllSubscription) { this.countryAllSubscription.unsubscribe(); }
    if (this.teamAllSubscription) { this.teamAllSubscription.unsubscribe(); }
    if (this.alertSourceTypeAllSubscription) { this.alertSourceTypeAllSubscription.unsubscribe(); }
    if (this.encodingAllSubscription) { this.encodingAllSubscription.unsubscribe(); }
  }

}
