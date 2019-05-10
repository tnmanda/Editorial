import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuItem, MessageService } from 'primeng/api';
import { JobControlService } from 'src/app/shared/services/admin/job-control/job-control.service';
import { environment } from 'src/environments/environment';
import { CountryService } from 'src/app/shared/services/admin/country.service';
import { Country } from 'src/app/shared/models/admin/country.model';
import { AlertJob } from 'src/app/shared/models/admin/job-control/alert-job.model';
import { TeamService } from 'src/app/shared/services/admin/team.service';
import { AlertSourceTypeService } from 'src/app/shared/services/admin/job-control/alert-source-type.service';
import { EncodingService } from 'src/app/shared/services/admin/job-control/encoding.service';
import { Team } from 'src/app/shared/models/admin/team.model';

@Component({
  selector: 'app-job-control-list',
  templateUrl: './job-control-list.component.html',
  styleUrls: ['./job-control-list.component.css'],
  providers: [MessageService]
})
export class JobControlListComponent implements OnInit, OnDestroy {

  selectedAlertJob: AlertJob;
  alertJobAllSubscription: Subscription;
  alertJobOneSubscription: Subscription;
  countryAllSubscription: Subscription;
  countryOneSubscription: Subscription;

  alertJobs: AlertJob[];
  countries: Country[];
  public items: MenuItem[];
  home: MenuItem;

  displayAddDialog = false;
  displayEditDialog = false;
  displayDeleteDialog = false;

  constructor(private jobControlSrv: JobControlService,
              private countrySrv: CountryService,
              private encodingSrv: EncodingService) { }

  ngOnInit() {
    this.items = [
      {label: 'Administrator'},
      {label: 'Job Management', url: 'job-control'},
    ];

    this.home = {icon: 'fa fa-home', url: 'home'};

    this.getAlertJobs();
    this.getCountries();
  }

  getAlertJobs() {
    this.jobControlSrv.apiUrl = environment.job_control.alert_job.root;
    this.alertJobAllSubscription = this.jobControlSrv.getAll().subscribe((items: Array<AlertJob>) => {
        this.alertJobs = items;
    });
  }

  getAlertJobByID(alertJobsID) {
    this.jobControlSrv.apiUrl = environment.job_control.alert_job.root;
    this.alertJobOneSubscription = this.jobControlSrv.getSingle(alertJobsID).subscribe(async (item: AlertJob) => {
        if (item.encoding !== null && item.encoding !== undefined) {
          this.encodingSrv.apiUrl = environment.job_control.encoding.by_name;
          item.encoding = await this.encodingSrv.getByName(item.encoding).toPromise();
        }

        this.selectedAlertJob = item;
        console.log(this.selectedAlertJob);
    });
  }

  getCountries() {
    this.countrySrv.apiUrl = environment.country.root;
    this.countryAllSubscription = this.countrySrv.getAll().subscribe((items: Array<Country>) => {
        this.countries = (items || []).sort((a: Country, b: Country) => a.countryName < b.countryName ? -1 : 1);
    });
  }

  showAddDialog() {
    this.displayAddDialog = true;
  }

  onAddDialogClose(event) {
    this.displayAddDialog = event;
    this.getAlertJobs();
  }

  showEditDialog(alertJobsID) {
    this.getAlertJobByID(alertJobsID);
    this.displayEditDialog = true;
  }

  onEditDialogClose(event) {
    this.displayEditDialog = event;
    this.getAlertJobs();
  }

  showDeleteDialog(alertJobsID) {
    this.getAlertJobByID(alertJobsID);
    this.displayDeleteDialog = true;
  }

  onDeleteDialogClose(event) {
    this.displayDeleteDialog = event;
    this.getAlertJobs();
  }

  onCountryChange(event, dt) {
    const filterValues = Array<String>();
    event.value.forEach(item => {
      filterValues.push(item.countryName);
    });
    dt.filter(filterValues, 'country.countryName', 'in');
  }

  ngOnDestroy(): void {
    if (this.alertJobAllSubscription) { this.alertJobAllSubscription.unsubscribe(); }
    if (this.alertJobOneSubscription) { this.alertJobOneSubscription.unsubscribe(); }
    if (this.countryAllSubscription) { this.countryAllSubscription.unsubscribe(); }
    if (this.countryOneSubscription) { this.countryOneSubscription.unsubscribe(); }
  }

}
