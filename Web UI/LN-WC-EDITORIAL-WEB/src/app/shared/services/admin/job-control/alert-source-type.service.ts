import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from 'src/app/shared/helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AlertSourceType } from 'src/app/shared/models/admin/job-control/alert-source-type.model';

@Injectable({
  providedIn: 'root'
})
export class AlertSourceTypeService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
    this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<AlertSourceType>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AlertSourceType>>(this.apiUrl)
    .pipe(map((response: Array<AlertSourceType>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<AlertSourceType> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<AlertSourceType>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as AlertSourceType)), catchError(this.handleError));
  }

  post(item: AlertSourceType): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: AlertSourceType): Observable<AlertSourceType> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: AlertSourceType) => {

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
