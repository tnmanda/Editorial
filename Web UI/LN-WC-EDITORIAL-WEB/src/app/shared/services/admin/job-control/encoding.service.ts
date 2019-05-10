import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from 'src/app/shared/helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Encoding } from 'src/app/shared/models/admin/job-control/encoding.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EncodingService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
    this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<Encoding>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<Encoding>>(this.apiUrl)
    .pipe(map((response: Array<Encoding>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<Encoding> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Encoding>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as Encoding)), catchError(this.handleError));
  }

  getByName(name: string): Observable<Encoding> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Encoding>(`${this.apiUrl}${name}`)
    .pipe(map((items => items as Encoding)), catchError(this.handleError));
  }

  post(item: Encoding): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: Encoding): Observable<Encoding> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: Encoding) => {

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
