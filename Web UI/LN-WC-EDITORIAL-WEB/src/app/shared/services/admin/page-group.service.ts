import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { PageGroup } from '../../models/admin/page-group.model';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PageGroupService extends AppErrorHandler implements OnDestroy  {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
       this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<PageGroup>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<PageGroup>>(this.apiUrl)
    .pipe(map((response: Array<PageGroup>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<PageGroup> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<PageGroup>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as PageGroup)), catchError(this.handleError));
  }

  post(item: PageGroup): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: PageGroup): Observable<PageGroup> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: PageGroup) => {
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
