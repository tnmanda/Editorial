import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../helpers/app-error-handler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NewsStatus } from '../models/news-status.model';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsStatusService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';
  public apiToken: string;

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<NewsStatus>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('authorization', 'Bearer ' + this.apiToken);

    return this.http.get<Array<NewsStatus>>(this.apiUrl, { headers: headers })
    .pipe(map((response: Array<NewsStatus>) => {
      return response;
    }), catchError(this.handleError));
  }

  ngOnDestroy(): void {
    this.apiUrl = null;
    this.apiToken = null;
  }
}
