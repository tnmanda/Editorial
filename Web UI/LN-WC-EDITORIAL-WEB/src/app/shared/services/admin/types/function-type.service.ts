import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../../helpers/app-error-handler';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { FunctionType } from '../../../models/admin/types/function-type.model';

@Injectable({
  providedIn: 'root'
})
export class FunctionTypeService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<FunctionType>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<FunctionType>>(this.apiUrl)
    .pipe(map((response: Array<FunctionType>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<FunctionType> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<FunctionType>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as FunctionType)), catchError(this.handleError));
  }

  post(item: FunctionType): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: FunctionType): Observable<FunctionType> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: FunctionType) => {
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
