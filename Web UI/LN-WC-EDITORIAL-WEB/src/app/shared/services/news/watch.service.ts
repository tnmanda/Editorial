import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Watch } from '../../models/news/watch.model';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WatchService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
       this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<Watch>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<Watch>>(this.apiUrl)
    .pipe(map((response: Array<Watch>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<Watch> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Watch>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as Watch)), catchError(this.handleError));
  }

  post(item: Watch): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: Watch): Observable<Watch> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: Watch) => {
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
