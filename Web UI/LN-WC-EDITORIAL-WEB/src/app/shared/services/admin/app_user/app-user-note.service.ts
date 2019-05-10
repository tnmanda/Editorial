import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { AppUserNote } from '../../../models/admin/app_user/app-user-note.model';

@Injectable({
  providedIn: 'root'
})
export class AppUserNoteService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
       this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<AppUserNote>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AppUserNote>>(this.apiUrl)
    .pipe(map((response: Array<AppUserNote>) => {
      return response;
    }), catchError(this.handleError));
  }

  getByAppUserId(id: string): Observable<Array<AppUserNote>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AppUserNote>>(`${this.apiUrl}${id}`)
    .pipe(map((response: Array<AppUserNote>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<AppUserNote> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<AppUserNote>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as AppUserNote)), catchError(this.handleError));
  }

  post(item: AppUserNote): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: AppUserNote): Observable<AppUserNote> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: AppUserNote) => {
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
