import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Disposition } from '../../models/investigation/disposition.model';

@Injectable({
  providedIn: 'root'
})
export class DispositionService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<Disposition>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<Disposition>>(this.apiUrl)
    .pipe(map((response: Array<Disposition>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<Disposition> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Disposition>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as Disposition)), catchError(this.handleError));
  }

  post(item: Disposition): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: Disposition): Observable<Disposition> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: Disposition) => {
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
