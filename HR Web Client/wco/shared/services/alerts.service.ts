import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../helpers/app-error-handler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AlertObject } from '../models/alert-object.model';
import { RecordLock } from '../models/record-lock.model';
import { AlertPostData } from '../models/alert-post-data.model';

@Injectable({
  providedIn: 'root'
})
export class AlertsService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';
  public apiToken: string;

  constructor(private http: HttpClient) {
    super();
  }

  getAlertsObject(id: string): Observable<AlertObject> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('authorization', 'Bearer ' + this.apiToken);
    return this.http.get<AlertObject>(`${this.apiUrl}${id}`, { headers: headers })
    .pipe(map((items => items as AlertObject)), catchError(this.handleError));
  }

  postLockEntity(item: RecordLock): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('authorization', 'Bearer ' + this.apiToken);

    return this.http.post(this.apiUrl, item, { headers: headers })
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  deleteUnlockEntity(item: RecordLock): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + this.apiToken
      }),
      body: item,
    };
    console.log(options);
    return this.http.delete(this.apiUrl, options)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: AlertPostData): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('authorization', 'Bearer ' + this.apiToken);

    return this.http.put(this.apiUrl, item, { headers: headers })
    .pipe(map((response: any) => {
      console.log(response);
      return response;
    }), catchError(this.handleError));
  }

  ngOnDestroy(): void {
    this.apiUrl = null;
    this.apiToken = null;
  }
}
