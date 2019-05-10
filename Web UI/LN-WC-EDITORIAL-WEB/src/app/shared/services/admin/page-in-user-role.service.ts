import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { PageInUserRole } from '../../models/admin/page-in-user-role.model';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PageInUserRoleService extends AppErrorHandler implements OnDestroy  {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
       this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<PageInUserRole>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<PageInUserRole>>(this.apiUrl)
    .pipe(map((response: Array<PageInUserRole>) => {
      return response;
    }), catchError(this.handleError));
  }

  getByRoleID(id: string): Observable<Array<PageInUserRole>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<PageInUserRole>>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as Array<PageInUserRole>)), catchError(this.handleError));
  }

  getSingle(id: string): Observable<PageInUserRole> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<PageInUserRole>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as PageInUserRole)), catchError(this.handleError));
  }

  post(item: PageInUserRole): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: PageInUserRole): Observable<PageInUserRole> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: PageInUserRole) => {
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
