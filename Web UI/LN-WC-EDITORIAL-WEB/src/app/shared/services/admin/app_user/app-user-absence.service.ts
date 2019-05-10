import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AppUserAbsence } from '../../../models/admin/app_user/app-user-absence.model';

@Injectable({
  providedIn: 'root'
})
export class AppUserAbsenceService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
       this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<AppUserAbsence>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AppUserAbsence>>(this.apiUrl)
    .pipe(map((response: Array<AppUserAbsence>) => {
      return response;
    }), catchError(this.handleError));
  }

  getByAppUserId(id: string): Observable<Array<AppUserAbsence>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AppUserAbsence>>(`${this.apiUrl}${id}`)
    .pipe(map((response: Array<AppUserAbsence>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<AppUserAbsence> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<AppUserAbsence>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as AppUserAbsence)), catchError(this.handleError));
  }

  post(item: AppUserAbsence): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: AppUserAbsence): Observable<AppUserAbsence> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: AppUserAbsence) => {
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
