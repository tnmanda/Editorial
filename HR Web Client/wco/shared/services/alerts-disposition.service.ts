import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../helpers/app-error-handler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AlertDisposition } from '../models/alert-disposition.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlertsDispositionService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';
  public apiToken: string;

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<AlertDisposition>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('authorization', 'Bearer ' + this.apiToken);

    return this.http.get<Array<AlertDisposition>>(this.apiUrl, { headers: headers })
    .pipe(map((response: Array<AlertDisposition>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<AlertDisposition> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('authorization', 'Bearer ' + this.apiToken);

    return this.http.get<AlertDisposition>(`${this.apiUrl}${id}`, { headers: headers })
    .pipe(map((items => items as AlertDisposition)), catchError(this.handleError));
  }

  post(item: AlertDisposition): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('authorization', 'Bearer ' + this.apiToken);

    return this.http.post(this.apiUrl, item, { headers: headers })
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: AlertDisposition): Observable<AlertDisposition> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('authorization', 'Bearer ' + this.apiToken);

    return this.http.put(this.apiUrl, item, { headers: headers })
    .pipe(map((response: AlertDisposition) => {
      console.log(response);
      return response;
    }), catchError(this.handleError));
  }

  delete(id: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('authorization', 'Bearer ' + this.apiToken);

    return this.http.delete(`${this.apiUrl}${id}`, { headers: headers })
    .pipe(map((response: string) => {
      return response;
    }), catchError(this.handleError));
  }

  ngOnDestroy(): void {
    this.apiUrl = null;
    this.apiToken = null;
  }
}
