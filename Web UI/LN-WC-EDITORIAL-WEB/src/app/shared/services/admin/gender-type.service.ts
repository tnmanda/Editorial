import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { GenderType } from '../../models/admin/types/gender-type.model';
import { AppErrorHandler } from '../../helpers/app-error-handler';

@Injectable({
  providedIn: 'root'
})
export class GenderTypeService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
    this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<GenderType>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<GenderType>>(this.apiUrl)
    .pipe(map((response: Array<GenderType>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<GenderType> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<GenderType>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as GenderType)), catchError(this.handleError));
  }
}
