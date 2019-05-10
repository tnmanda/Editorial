import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../helpers/app-error-handler';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Office } from '../../models/admin/office.model';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OfficeService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
       this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<Office>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<Office>>(this.apiUrl)
    .pipe(map((response: Array<Office>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<Office> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Office>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as Office)), catchError(this.handleError));
  }

  post(item: Office): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: Office): Observable<Office> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: Office) => {
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
