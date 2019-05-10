import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { GenderType } from '../../../models/admin/types/gender-type.model';

@Injectable({
  providedIn: 'root'
})
export class GenderTypeService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<GenderType>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<GenderType>>(this.apiUrl)
    .pipe(map((response: Array<GenderType>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<GenderType> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<GenderType>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as GenderType)), catchError(this.handleError));
  }

  post(item: GenderType): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: GenderType): Observable<GenderType> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: GenderType) => {
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
