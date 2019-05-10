import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { WorkUnitDuration } from '../../models/admin/work-unit-duration.model';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkUnitDurationService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<WorkUnitDuration>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<WorkUnitDuration>>(this.apiUrl)
    .pipe(map((response: Array<WorkUnitDuration>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<WorkUnitDuration> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<WorkUnitDuration>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as WorkUnitDuration)), catchError(this.handleError));
  }

  post(item: WorkUnitDuration): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: WorkUnitDuration): Observable<WorkUnitDuration> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: WorkUnitDuration) => {
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

  ngOnDestroy(): void {
    this.apiUrl = null;
  }
}
