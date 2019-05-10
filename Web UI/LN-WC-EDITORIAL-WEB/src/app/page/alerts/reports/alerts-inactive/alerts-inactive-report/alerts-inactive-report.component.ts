import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AlertsReportService } from 'src/app/shared/services/alerts/alerts-report.service';
import { AlertInactive } from 'src/app/shared/models/alerts/reports/alert-inactive.model';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CountryService } from 'src/app/shared/services/admin/country.service';
import { Country } from 'src/app/shared/models/admin/country.model';

@Component({
  selector: 'app-alerts-inactive-report',
  templateUrl: './alerts-inactive-report.component.html',
  styleUrls: ['./alerts-inactive-report.component.css']
})
export class AlertsInactiveReportComponent implements OnInit, OnDestroy {

  public items: MenuItem[];
  home: MenuItem;

  alertInactives: AlertInactive[];
  alertInactiveAllSubscription: Subscription;
  countryAllSubscription: Subscription;

  constructor(private alertsReportSrv: AlertsReportService,
              private countrySrv: CountryService) { }

  ngOnInit() {
    this.items = [
      {label: 'Alerts', url: 'alerts-management'},
      {label: 'Inactive Alerts', url: 'alerts-inactive-report'},
    ];

    this.home = {icon: 'fa fa-home', url: 'home'};

    this.getInActiveAlerts();
  }

  getInActiveAlerts() {
    this.alertsReportSrv.apiUrl = environment.alerts_management.reports.inactive;
    this.alertInactiveAllSubscription =  this.alertsReportSrv.getInActiveReport().subscribe((items: Array<AlertInactive>) => {
      this.alertInactives = items;
      this.getCountryByID(this.alertInactives);
    });
  }

  getCountryByID(alertInactives) {
    alertInactives.forEach((alert: AlertInactive) => {
      if (alert.countryID) {
        this.countrySrv.apiUrl = environment.country.root;
        this.countryAllSubscription = this.countrySrv.getSingle(alert.countryID.toString()).subscribe((item: Country) => {
            alert.country = item;
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.alertInactiveAllSubscription) { this.alertInactiveAllSubscription.unsubscribe(); }
    if (this.countryAllSubscription) { this.countryAllSubscription.unsubscribe(); }
  }
}
