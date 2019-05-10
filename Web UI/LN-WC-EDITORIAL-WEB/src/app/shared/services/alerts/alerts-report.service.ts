import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AlertPastDue } from '../../models/alerts/reports/alert-past-due.model';
import { AlertInactive } from '../../models/alerts/reports/alert-inactive.model';

@Injectable({
  providedIn: 'root'
})
export class AlertsReportService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
       this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getPastDueReport(): Observable<Array<AlertPastDue>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AlertPastDue>>(`${this.apiUrl}`)
    .pipe(map((response: Array<AlertPastDue>) => {
      return response;
    }), catchError(this.handleError));
  }

  getInActiveReport(): Observable<Array<AlertInactive>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AlertInactive>>(`${this.apiUrl}`)
    .pipe(map((response: Array<AlertInactive>) => {
      return response;
    }), catchError(this.handleError));
  }
}
