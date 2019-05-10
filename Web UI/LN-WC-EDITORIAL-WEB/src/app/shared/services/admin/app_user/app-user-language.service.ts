import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AppUserLanguage } from '../../../models/admin/app_user/app-user-language.model';

@Injectable({
  providedIn: 'root'
})
export class AppUserLanguageService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
       this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<AppUserLanguage>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AppUserLanguage>>(this.apiUrl)
    .pipe(map((response: Array<AppUserLanguage>) => {
      return response;
    }), catchError(this.handleError));
  }

  getByAppUserId(id: string): Observable<Array<AppUserLanguage>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AppUserLanguage>>(`${this.apiUrl}${id}`)
    .pipe(map((response: Array<AppUserLanguage>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<AppUserLanguage> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<AppUserLanguage>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as AppUserLanguage)), catchError(this.handleError));
  }

  post(item: AppUserLanguage): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: AppUserLanguage): Observable<AppUserLanguage> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: AppUserLanguage) => {
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
