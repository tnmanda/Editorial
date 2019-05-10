import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { AppUserTeamAssignment } from '../../../models/admin/app_user/app-user-team-assignment.model';

@Injectable({
  providedIn: 'root'
})
export class AppUserTeamAssignmentService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
       this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<AppUserTeamAssignment>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AppUserTeamAssignment>>(this.apiUrl)
    .pipe(map((response: Array<AppUserTeamAssignment>) => {
      return response;
    }), catchError(this.handleError));
  }

  getByAppUserId(id: string): Observable<Array<AppUserTeamAssignment>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AppUserTeamAssignment>>(`${this.apiUrl}${id}`)
    .pipe(map((response: Array<AppUserTeamAssignment>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<AppUserTeamAssignment> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<AppUserTeamAssignment>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as AppUserTeamAssignment)), catchError(this.handleError));
  }

  post(item: AppUserTeamAssignment): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: AppUserTeamAssignment): Observable<AppUserTeamAssignment> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: AppUserTeamAssignment) => {
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
