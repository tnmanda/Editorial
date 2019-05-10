import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { AppUserEmploymentRecord } from '../../../models/admin/app_user/app-user-employment-record.model';

@Injectable({
  providedIn: 'root'
})
export class AppUserEmploymentRecordService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
       this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<AppUserEmploymentRecord>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AppUserEmploymentRecord>>(this.apiUrl)
    .pipe(map((response: Array<AppUserEmploymentRecord>) => {
      return response;
    }), catchError(this.handleError));
  }

  getByAppUserId(id: string): Observable<Array<AppUserEmploymentRecord>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AppUserEmploymentRecord>>(`${this.apiUrl}${id}`)
    .pipe(map((response: Array<AppUserEmploymentRecord>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<AppUserEmploymentRecord> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<AppUserEmploymentRecord>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as AppUserEmploymentRecord)), catchError(this.handleError));
  }

  post(item: AppUserEmploymentRecord): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: AppUserEmploymentRecord): Observable<AppUserEmploymentRecord> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: AppUserEmploymentRecord) => {
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
