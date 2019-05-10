import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { UserMap } from '../../models/admin/user-map.model';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserMapService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
       this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<UserMap>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<UserMap>>(this.apiUrl)
    .pipe(map((response: Array<UserMap>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<UserMap> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<UserMap>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as UserMap)), catchError(this.handleError));
  }

  post(item: UserMap): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: UserMap): Observable<UserMap> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: UserMap) => {
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
