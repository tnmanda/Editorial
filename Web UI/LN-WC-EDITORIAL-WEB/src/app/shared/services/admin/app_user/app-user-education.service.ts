import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { AppUserEducation } from '../../../models/admin/app_user/app-user-education.model';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppUserEducationService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
       this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<AppUserEducation>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AppUserEducation>>(this.apiUrl)
    .pipe(map((response: Array<AppUserEducation>) => {
      return response;
    }), catchError(this.handleError));
  }

  getByAppUserId(id: string): Observable<Array<AppUserEducation>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AppUserEducation>>(`${this.apiUrl}${id}`)
    .pipe(map((response: Array<AppUserEducation>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<AppUserEducation> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<AppUserEducation>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as AppUserEducation)), catchError(this.handleError));
  }

  post(item: AppUserEducation): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: AppUserEducation): Observable<AppUserEducation> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: AppUserEducation) => {
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
