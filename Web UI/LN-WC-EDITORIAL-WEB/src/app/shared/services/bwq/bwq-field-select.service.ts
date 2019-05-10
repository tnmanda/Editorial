import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BwqFieldSelect } from '../../models/bwq/bwq-field-select.model';

@Injectable({
  providedIn: 'root'
})
export class BwqFieldSelectService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
       this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<BwqFieldSelect>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<BwqFieldSelect>>(this.apiUrl)
    .pipe(map((response: Array<BwqFieldSelect>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<BwqFieldSelect> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<BwqFieldSelect>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as BwqFieldSelect)), catchError(this.handleError));
  }

  post(item: BwqFieldSelect): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: BwqFieldSelect): Observable<BwqFieldSelect> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: BwqFieldSelect) => {
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
