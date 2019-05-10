import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { AlertJob } from 'src/app/shared/models/admin/job-control/alert-job.model';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/shared/models/admin/country.model';
import { Team } from 'src/app/shared/models/admin/team.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { JobControlService } from 'src/app/shared/services/admin/job-control/job-control.service';
import { CountryService } from 'src/app/shared/services/admin/country.service';
import { MessageService } from 'primeng/api';
import { TeamService } from 'src/app/shared/services/admin/team.service';
import { environment } from 'src/environments/environment';
import { AlertSourceTypeService } from 'src/app/shared/services/admin/job-control/alert-source-type.service';
import { AlertSourceType } from 'src/app/shared/models/admin/job-control/alert-source-type.model';
import { EncodingService } from 'src/app/shared/services/admin/job-control/encoding.service';
import { Encoding } from 'src/app/shared/models/admin/job-control/encoding.model';

@Component({
  selector: 'app-job-control-add-dialog',
  templateUrl: './job-control-add-dialog.component.html',
  styleUrls: ['./job-control-add-dialog.component.css']
})
export class JobControlAddDialogComponent implements OnInit, OnDestroy, OnChanges {

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  alertJob: AlertJob;
  countries: Country[];
  teams: Team[];
  alertSourceTypes: AlertSourceType[];
  encodings: Encoding[];

  alertJobAddSubscription: Subscription;
  countryAllSubscription: Subscription;
  teamAllSubscription: Subscription;
  alertSourceTypeAllSubscription: Subscription;
  encodingAllSubscription: Subscription;

  isSubmitted = false;

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
    this.getCountries();
    this.getTeams();
    this.getSourceTypes();
    this.getEncodings();
  }

  ngOnChanges() {
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
    this.teamSrv.apiUrl = environment.team.root;
    this.teamAllSubscription = this.teamSrv.getAll().subscribe((items: Array<Team>) => {
      this.teams = items;
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
    this.encodingAllSubscription = this.encodingSrv.getAll().subscribe((items: Array<Encoding>) => {
      this.encodings = items;
    });
  }

  onSave(alertJobForm) {
    this.isSubmitted = true;
    if (alertJobForm.valid) {
      this.alertJob = alertJobForm.value;
      this.alertJob.countryID = this.alertJob.country.countryID;
      this.alertJob.teamID = this.alertJob.team.teamID;
      this.alertJob.alertSourceTypeID = this.alertJob.alertSourceType.alertSourceTypeID;
      this.alertJob.encoding = this.alertJob.encoding.encodingName;
      this.alertJob.isSendNoUpdate = false;
      this.alertJob.resultType = null;
      this.alertJob.createdBy = this.globalHelperSrv.getCurrentUser();
      this.alertJob.updatedBy = this.globalHelperSrv.getCurrentUser();
      this.alertJob.dateCreatedUTC = new Date().toUTCString();
      this.alertJob.lastUpdatedUTC = new Date().toUTCString();
      this.alertJob.country = null;
      this.alertJob.team = null;
      this.alertJob.alertSourceType = null;

      this.jobControlSrv.apiUrl = environment.job_control.alert_job.root;
      this.alertJobAddSubscription = this.jobControlSrv.post(this.alertJob).subscribe(result => {
        this.onClose();

        // Post Message
        this.messageService.add({severity: 'success', summary: 'Success Message',
        detail: 'Job successfully created.' });

        this.alertJob = new AlertJob();
      }, error => { this.errorMessage = error; });
    }
  }

  onClose() {
    this.isSubmitted = false;
    this.alertJobForm.reset();
    this.displayChange.emit(false);
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.alertJobAddSubscription) { this.alertJobAddSubscription.unsubscribe(); }
    if (this.countryAllSubscription) { this.countryAllSubscription.unsubscribe(); }
    if (this.teamAllSubscription) { this.teamAllSubscription.unsubscribe(); }
    if (this.alertSourceTypeAllSubscription) { this.alertSourceTypeAllSubscription.unsubscribe(); }
    if (this.encodingAllSubscription) { this.encodingAllSubscription.unsubscribe(); }
  }
}
