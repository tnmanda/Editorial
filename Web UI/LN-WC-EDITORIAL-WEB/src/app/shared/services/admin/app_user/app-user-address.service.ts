import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AppUserAddress } from '../../../models/admin/app_user/app-user-address.model';

@Injectable({
  providedIn: 'root'
})
export class AppUserAddressService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
       this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<AppUserAddress>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AppUserAddress>>(this.apiUrl)
    .pipe(map((response: Array<AppUserAddress>) => {
      return response;
    }), catchError(this.handleError));
  }

  getByAppUserId(id: string): Observable<Array<AppUserAddress>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AppUserAddress>>(`${this.apiUrl}${id}`)
    .pipe(map((response: Array<AppUserAddress>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<AppUserAddress> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<AppUserAddress>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as AppUserAddress)), catchError(this.handleError));
  }

  post(item: AppUserAddress): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: AppUserAddress): Observable<AppUserAddress> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: AppUserAddress) => {
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
