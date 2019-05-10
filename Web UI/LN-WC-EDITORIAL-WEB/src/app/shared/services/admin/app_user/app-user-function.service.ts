import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { AppUserFunction } from '../../../models/admin/app_user/app-user-function.model';
import { Observable, throwError } from 'rxjs';

import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppUserFunctionService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
       this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<AppUserFunction>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AppUserFunction>>(this.apiUrl)
    .pipe(map((response: Array<AppUserFunction>) => {
      return response;
    }), catchError(this.handleError));
  }

  getByAppUserId(id: string): Observable<Array<AppUserFunction>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AppUserFunction>>(`${this.apiUrl}${id}`)
    .pipe(map((response: Array<AppUserFunction>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<AppUserFunction> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<AppUserFunction>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as AppUserFunction)), catchError(this.handleError));
  }

  post(item: AppUserFunction): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: AppUserFunction): Observable<AppUserFunction> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: AppUserFunction) => {
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
