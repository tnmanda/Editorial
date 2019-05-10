import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../helpers/app-error-handler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NewsObject } from '../models/news-object.model';
import { catchError, map } from 'rxjs/operators';
import { NewsPostData, LockData } from '../models/news-post-data.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';
  public apiToken: string;

  constructor(private http: HttpClient) {
    super();
  }

  getNewsObject(id: string): Observable<NewsObject> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('authorization', 'Bearer ' + this.apiToken);
    return this.http.get<NewsObject>(`${this.apiUrl}${id}`, { headers: headers })
    .pipe(map((items => items as NewsObject)), catchError(this.handleError));
  }

  put(item: NewsPostData): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('authorization', 'Bearer ' + this.apiToken);

    return this.http.put(this.apiUrl, item, { headers: headers })
    .pipe(map((response: any) => {
      console.log(response);
      return response;
    }), catchError(this.handleError));
  }

  lockUnlock(item: LockData): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('authorization', 'Bearer ' + this.apiToken);

    return this.http.post(this.apiUrl, item, { headers: headers })
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  ngOnDestroy(): void {
    this.apiUrl = null;
    this.apiToken = null;
  }
}
