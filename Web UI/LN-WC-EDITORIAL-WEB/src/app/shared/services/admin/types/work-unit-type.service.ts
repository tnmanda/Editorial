import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { WorkUnitType } from '../../../models/admin/types/work-unit-type.model';

@Injectable({
  providedIn: 'root'
})
export class WorkUnitTypeService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<WorkUnitType>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<WorkUnitType>>(this.apiUrl)
    .pipe(map((response: Array<WorkUnitType>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<WorkUnitType> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<WorkUnitType>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as WorkUnitType)), catchError(this.handleError));
  }

  post(item: WorkUnitType): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: WorkUnitType): Observable<WorkUnitType> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: WorkUnitType) => {
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
