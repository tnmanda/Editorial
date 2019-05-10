import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { AppUserResearchTeam } from '../../../models/admin/app_user/app-user-research-team.model';

@Injectable({
  providedIn: 'root'
})
export class AppUserResearchTeamService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
       this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<AppUserResearchTeam>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AppUserResearchTeam>>(this.apiUrl)
    .pipe(map((response: Array<AppUserResearchTeam>) => {
      return response;
    }), catchError(this.handleError));
  }

  getByAppUserId(id: string): Observable<Array<AppUserResearchTeam>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AppUserResearchTeam>>(`${this.apiUrl}${id}`)
    .pipe(map((response: Array<AppUserResearchTeam>) => {
      return response;
    }), catchError(this.handleError));
  }


  getSingle(id: string): Observable<AppUserResearchTeam> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<AppUserResearchTeam>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as AppUserResearchTeam)), catchError(this.handleError));
  }

  post(item: AppUserResearchTeam): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: AppUserResearchTeam): Observable<AppUserResearchTeam> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: AppUserResearchTeam) => {
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
