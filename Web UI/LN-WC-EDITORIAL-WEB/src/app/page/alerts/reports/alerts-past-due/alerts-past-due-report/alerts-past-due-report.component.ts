import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertPastDue } from 'src/app/shared/models/alerts/reports/alert-past-due.model';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AlertsReportService } from 'src/app/shared/services/alerts/alerts-report.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-alerts-past-due-report',
  templateUrl: './alerts-past-due-report.component.html',
  styleUrls: ['./alerts-past-due-report.component.css'],
  providers: [MessageService]
})
export class AlertsPastDueReportComponent implements OnInit, OnDestroy {

  public items: MenuItem[];
  home: MenuItem;

  alertPastDues: AlertPastDue[];
  alertPastDueAllSubscription: Subscription;

  constructor(private alertsReportSrv: AlertsReportService) { }

  ngOnInit() {
    this.items = [
      {label: 'Alerts', url: 'alerts-management'},
      {label: 'Past Due Alerts', url: 'alerts-past-due-report'},
    ];

    this.home = {icon: 'fa fa-home', url: 'home'};

    this.getPastDueAlerts();
  }

  getPastDueAlerts() {
    this.alertsReportSrv.apiUrl = environment.alerts_management.reports.past_due;
    this.alertPastDueAllSubscription =  this.alertsReportSrv.getPastDueReport().subscribe((items: Array<AlertPastDue>) => {
      this.alertPastDues = items;
    });
  }

  ngOnDestroy(): void {
    if (this.alertPastDueAllSubscription) { this.alertPastDueAllSubscription.unsubscribe(); }
  }

}
