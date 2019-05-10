import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Page } from '../../models/admin/page.model';
import { map, catchError } from 'rxjs/operators';
import { PageGroupPerRole } from '../../models/admin/pages-per-role.model';

@Injectable({
  providedIn: 'root'
})
export class PageService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
       this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<Page>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<Page>>(this.apiUrl)
    .pipe(map((response: Array<Page>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<Page> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Page>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as Page)), catchError(this.handleError));
  }

  getByRoleID(id: string): Observable<Array<PageGroupPerRole>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<PageGroupPerRole>>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as Array<PageGroupPerRole>)), catchError(this.handleError));
  }

  post(item: Page): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: Page): Observable<Page> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: Page) => {
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
