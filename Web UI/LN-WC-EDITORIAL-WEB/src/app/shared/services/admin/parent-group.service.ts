import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { ParentGroup } from '../../models/admin/parent-group.model';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ParentGroupService extends AppErrorHandler implements OnDestroy  {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
       this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<ParentGroup>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<ParentGroup>>(this.apiUrl)
    .pipe(map((response: Array<ParentGroup>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<ParentGroup> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<ParentGroup>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as ParentGroup)), catchError(this.handleError));
  }

  post(item: ParentGroup): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: ParentGroup): Observable<ParentGroup> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: ParentGroup) => {
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
