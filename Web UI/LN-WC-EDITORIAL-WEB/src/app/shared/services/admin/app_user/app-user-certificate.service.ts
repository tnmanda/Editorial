import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AppUserCertificate } from '../../../models/admin/app_user/app-user-certificate.model';

@Injectable({
  providedIn: 'root'
})
export class AppUserCertificateService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
       this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<AppUserCertificate>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AppUserCertificate>>(this.apiUrl)
    .pipe(map((response: Array<AppUserCertificate>) => {
      return response;
    }), catchError(this.handleError));
  }

  getByAppUserId(id: string): Observable<Array<AppUserCertificate>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AppUserCertificate>>(`${this.apiUrl}${id}`)
    .pipe(map((response: Array<AppUserCertificate>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<AppUserCertificate> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<AppUserCertificate>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as AppUserCertificate)), catchError(this.handleError));
  }

  post(item: AppUserCertificate): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: AppUserCertificate): Observable<AppUserCertificate> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: AppUserCertificate) => {
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
