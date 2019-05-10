import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { WatchKeyword } from '../../models/news/watch-keyword.model';

@Injectable({
  providedIn: 'root'
})
export class WatchKeywordService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
       this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<WatchKeyword>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<WatchKeyword>>(this.apiUrl)
    .pipe(map((response: Array<WatchKeyword>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<WatchKeyword> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<WatchKeyword>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as WatchKeyword)), catchError(this.handleError));
  }

  getByWatchId(id: string): Observable<Array<WatchKeyword>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<WatchKeyword>>(`${this.apiUrl}${id}`)
    .pipe(map((response: Array<WatchKeyword>) => {
      return response;
    }), catchError(this.handleError));
  }

  post(item: WatchKeyword): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: WatchKeyword): Observable<WatchKeyword> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: WatchKeyword) => {
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
