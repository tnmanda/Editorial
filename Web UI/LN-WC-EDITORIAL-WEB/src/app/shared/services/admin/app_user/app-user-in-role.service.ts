import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { AppUserInRole } from '../../../models/admin/app_user/app-user-in-role.model';

@Injectable({
  providedIn: 'root'
})
export class AppUserInRoleService extends AppErrorHandler implements OnDestroy  {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
       this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<AppUserInRole>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AppUserInRole>>(this.apiUrl)
    .pipe(map((response: Array<AppUserInRole>) => {
      return response;
    }), catchError(this.handleError));
  }

  getByAppUserId(id: string): Observable<Array<AppUserInRole>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AppUserInRole>>(`${this.apiUrl}${id}`)
    .pipe(map((response: Array<AppUserInRole>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<AppUserInRole> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<AppUserInRole>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as AppUserInRole)), catchError(this.handleError));
  }

  post(item: AppUserInRole): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: AppUserInRole): Observable<AppUserInRole> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: AppUserInRole) => {
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
