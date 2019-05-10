import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { AppUserCountry } from '../../../models/admin/app_user/app-user-country.model';

@Injectable({
  providedIn: 'root'
})
export class AppUserCountryService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
       this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<AppUserCountry>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AppUserCountry>>(this.apiUrl)
    .pipe(map((response: Array<AppUserCountry>) => {
      return response;
    }), catchError(this.handleError));
  }

  getByAppUserId(id: string): Observable<Array<AppUserCountry>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AppUserCountry>>(`${this.apiUrl}${id}`)
    .pipe(map((response: Array<AppUserCountry>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<AppUserCountry> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<AppUserCountry>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as AppUserCountry)), catchError(this.handleError));
  }

  post(item: AppUserCountry): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: AppUserCountry): Observable<AppUserCountry> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: AppUserCountry) => {
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
