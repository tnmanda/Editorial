import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../helpers/app-error-handler';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OperationalRoleType } from '../../models/admin/operational-role-type.model';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OperationalRoleTypeService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
    this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<OperationalRoleType>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<OperationalRoleType>>(this.apiUrl)
    .pipe(map((response: Array<OperationalRoleType>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<OperationalRoleType> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<OperationalRoleType>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as OperationalRoleType)), catchError(this.handleError));
  }
}
