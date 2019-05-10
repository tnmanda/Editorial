import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { RoleType } from '../../../models/admin/types/role-type.model';

@Injectable({
  providedIn: 'root'
})
export class RoleTypeService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<RoleType>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<RoleType>>(this.apiUrl)
    .pipe(map((response: Array<RoleType>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<RoleType> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<RoleType>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as RoleType)), catchError(this.handleError));
  }

  post(item: RoleType): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: RoleType): Observable<RoleType> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: RoleType) => {
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
