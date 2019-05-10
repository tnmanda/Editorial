import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { AbsenceType } from '../../../models/admin/types/absence-type.model';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AbsenceTypeService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<AbsenceType>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AbsenceType>>(this.apiUrl)
    .pipe(map((response: Array<AbsenceType>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<AbsenceType> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<AbsenceType>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as AbsenceType)), catchError(this.handleError));
  }

  post(item: AbsenceType): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: AbsenceType): Observable<AbsenceType> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: AbsenceType) => {
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
