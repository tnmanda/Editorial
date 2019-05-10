import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AlertsJobNav, AlertJobEntityData } from '../../models/alerts/alerts-job-nav.model';
import { map, catchError } from 'rxjs/operators';
import { AlertJob } from '../../models/alerts/alert-job.model';
import { AlertJobQueue, AlertJobQueuePostData, AlertJobsQueueEntityPostData } from '../../models/alerts/alert-job-queue.model';
import { AlertJobs } from '../../models/alerts/alert-jobs.model';
import { AlertName } from '../../models/alerts/alert-name.model';
import { AlertPriority } from '../../models/alerts/alert-priority.model';
import { AlertStatus } from '../../models/alerts/alert-status.model';
import { AlertJobsQueueEntity } from '../../models/alerts/alert-jobs-queue-entity.model';

@Injectable({
  providedIn: 'root'
})
export class AlertsService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
       this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getNavs(): Observable<Array<AlertsJobNav>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AlertsJobNav>>(`${this.apiUrl}`)
    .pipe(map((response: Array<AlertsJobNav>) => {
      return response;
    }), catchError(this.handleError));
  }

  getAlertJobsQueueEntities(item: AlertJobEntityData): Observable<Array<AlertJobsQueueEntity>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.post(this.apiUrl, item)
    .pipe(map((response: Array<AlertJobsQueueEntity>) => {
      return response;
    }), catchError(this.handleError));
  }

  getAlertJobs(): Observable<Array<AlertJobs>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get(this.apiUrl)
    .pipe(map((response: Array<AlertJobs>) => {
      return response;
    }), catchError(this.handleError));
  }

  getAlertNames(id: string): Observable<Array<AlertName>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AlertName>>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as Array<AlertName>)), catchError(this.handleError));
  }

  getAlertJobQueues(): Observable<Array<AlertJobQueue>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get(this.apiUrl)
    .pipe(map((response: Array<AlertJobQueue>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<AlertJobQueue> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<AlertJobQueue>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as AlertJobQueue)), catchError(this.handleError));
  }

  getAlertPriorities(): Observable<Array<AlertPriority>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AlertPriority>>(`${this.apiUrl}`)
    .pipe(map((response: Array<AlertPriority>) => {
      return response;
    }), catchError(this.handleError));
  }

  getAlertStatus(): Observable<Array<AlertStatus>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AlertStatus>>(`${this.apiUrl}`)
    .pipe(map((response: Array<AlertStatus>) => {
      return response;
    }), catchError(this.handleError));
  }

  postAlertJobsQueueEntity(item: AlertJobsQueueEntityPostData): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  post(item: AlertJobQueuePostData): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: AlertJobs): Observable<AlertJobs> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: AlertJobs) => {
      console.log(response);
      return response;
    }), catchError(this.handleError));
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}${id}`)
    .pipe(map((response: string) => {
      return response;
    }), catchError(this.handleError));
  }
}
