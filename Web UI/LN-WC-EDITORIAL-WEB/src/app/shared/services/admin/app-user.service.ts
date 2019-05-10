import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AppUser } from '../../models/admin/app-user.model';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppUserService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
    this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<AppUser>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AppUser>>(this.apiUrl)
    .pipe(map((response: Array<AppUser>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<AppUser> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<AppUser>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as AppUser)), catchError(this.handleError));
  }

  post(item: AppUser): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: AppUser): Observable<AppUser> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: AppUser) => {

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
