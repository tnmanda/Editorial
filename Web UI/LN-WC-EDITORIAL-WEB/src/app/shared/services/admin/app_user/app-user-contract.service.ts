import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { AppUserContract } from '../../../models/admin/app_user/app-user-contract.model';

@Injectable({
  providedIn: 'root'
})
export class AppUserContractService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
       this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<AppUserContract>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AppUserContract>>(this.apiUrl)
    .pipe(map((response: Array<AppUserContract>) => {
      return response;
    }), catchError(this.handleError));
  }

  getByAppUserId(id: string): Observable<Array<AppUserContract>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AppUserContract>>(`${this.apiUrl}${id}`)
    .pipe(map((response: Array<AppUserContract>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<AppUserContract> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<AppUserContract>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as AppUserContract)), catchError(this.handleError));
  }

  post(item: AppUserContract): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: AppUserContract): Observable<AppUserContract> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: AppUserContract) => {
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
