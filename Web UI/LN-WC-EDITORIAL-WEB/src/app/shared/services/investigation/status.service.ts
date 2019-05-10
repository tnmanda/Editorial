import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AppErrorHandler } from '../../helpers/app-error-handler';
import { Status } from '../../models/investigation/status.model';

@Injectable({
  providedIn: 'root'
})
export class StatusService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<Status>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<Status>>(this.apiUrl)
    .pipe(map((response: Array<Status>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<Status> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Status>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as Status)), catchError(this.handleError));
  }

  post(item: Status): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: Status): Observable<Status> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: Status) => {
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
