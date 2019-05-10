import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { AppUserTeam } from '../../../models/admin/app_user/app-user-team.model';

@Injectable({
  providedIn: 'root'
})
export class AppUserTeamService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
       this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<AppUserTeam>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AppUserTeam>>(this.apiUrl)
    .pipe(map((response: Array<AppUserTeam>) => {
      return response;
    }), catchError(this.handleError));
  }

  getByAppUserId(id: string): Observable<Array<AppUserTeam>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AppUserTeam>>(`${this.apiUrl}${id}`)
    .pipe(map((response: Array<AppUserTeam>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<AppUserTeam> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<AppUserTeam>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as AppUserTeam)), catchError(this.handleError));
  }

  post(item: AppUserTeam): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: AppUserTeam): Observable<AppUserTeam> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: AppUserTeam) => {
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
