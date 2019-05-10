import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { DepartureType } from '../../../models/admin/types/departure-type.model';

@Injectable({
  providedIn: 'root'
})
export class DepartureTypeService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<DepartureType>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<DepartureType>>(this.apiUrl)
    .pipe(map((response: Array<DepartureType>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<DepartureType> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<DepartureType>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as DepartureType)), catchError(this.handleError));
  }

  post(item: DepartureType): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: DepartureType): Observable<DepartureType> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: DepartureType) => {
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
