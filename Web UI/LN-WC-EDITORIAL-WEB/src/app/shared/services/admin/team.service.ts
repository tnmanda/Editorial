import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Team } from '../../models/admin/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
       this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<Team>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<Team>>(this.apiUrl)
    .pipe(map((response: Array<Team>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<Team> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Team>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as Team)), catchError(this.handleError));
  }

  post(item: Team): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: Team): Observable<Team> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: Team) => {
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
