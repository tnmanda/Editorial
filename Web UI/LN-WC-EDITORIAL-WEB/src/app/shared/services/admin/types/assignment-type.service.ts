import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AssignmentType } from '../../../models/admin/types/assignment-type.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentTypeService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<AssignmentType>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AssignmentType>>(this.apiUrl)
    .pipe(map((response: Array<AssignmentType>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<AssignmentType> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<AssignmentType>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as AssignmentType)), catchError(this.handleError));
  }

  post(item: AssignmentType): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: AssignmentType): Observable<AssignmentType> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: AssignmentType) => {
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
