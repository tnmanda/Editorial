import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { PriorityType } from '../../models/investigation/priority-type.model';

@Injectable({
  providedIn: 'root'
})
export class PriorityTypeService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<PriorityType>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<PriorityType>>(this.apiUrl)
    .pipe(map((response: Array<PriorityType>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<PriorityType> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<PriorityType>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as PriorityType)), catchError(this.handleError));
  }

  post(item: PriorityType): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: PriorityType): Observable<PriorityType> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: PriorityType) => {
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
