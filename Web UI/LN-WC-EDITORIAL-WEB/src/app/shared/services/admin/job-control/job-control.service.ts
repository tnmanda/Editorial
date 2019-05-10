import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from 'src/app/shared/helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AlertJob } from 'src/app/shared/models/admin/job-control/alert-job.model';

@Injectable({
  providedIn: 'root'
})
export class JobControlService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
    this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<AlertJob>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AlertJob>>(this.apiUrl)
    .pipe(map((response: Array<AlertJob>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<AlertJob> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<AlertJob>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as AlertJob)), catchError(this.handleError));
  }

  post(item: AlertJob): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: AlertJob): Observable<AlertJob> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: AlertJob) => {

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
