import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../helpers/app-error-handler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { BwqDispositions } from '../models/bwq-dispositions.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BwqDispositionService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';
  public apiToken: string;

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<BwqDispositions>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('authorization', 'Bearer ' + this.apiToken);

    return this.http.get<Array<BwqDispositions>>(this.apiUrl, { headers: headers })
    .pipe(map((response: Array<BwqDispositions>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<BwqDispositions> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('authorization', 'Bearer ' + this.apiToken);

    return this.http.get<BwqDispositions>(`${this.apiUrl}${id}`, { headers: headers })
    .pipe(map((items => items as BwqDispositions)), catchError(this.handleError));
  }

  post(item: BwqDispositions): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('authorization', 'Bearer ' + this.apiToken);

    return this.http.post(this.apiUrl, item, { headers: headers })
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: BwqDispositions): Observable<BwqDispositions> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('authorization', 'Bearer ' + this.apiToken);

    return this.http.put(this.apiUrl, item, { headers: headers })
    .pipe(map((response: BwqDispositions) => {
      console.log(response);
      return response;
    }), catchError(this.handleError));
  }

  delete(id: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('authorization', 'Bearer ' + this.apiToken);

    return this.http.delete(`${this.apiUrl}${id}`, { headers: headers })
    .pipe(map((response: string) => {
      return response;
    }), catchError(this.handleError));
  }

  ngOnDestroy(): void {
    this.apiUrl = null;
    this.apiToken = null;
  }
}
