import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ActivityType } from '../../models/investigation/activity-type.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityTypeService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<ActivityType>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<ActivityType>>(this.apiUrl)
    .pipe(map((response: Array<ActivityType>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<ActivityType> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<ActivityType>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as ActivityType)), catchError(this.handleError));
  }

  post(item: ActivityType): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: ActivityType): Observable<ActivityType> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: ActivityType) => {
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
