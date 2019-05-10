import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../helpers/app-error-handler';
import { Observable, throwError } from 'rxjs';
import { PriorityType } from '../models/priority-type.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PriorityTypeService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';
  public apiToken: string;

  constructor(private http: HttpClient) {
    super();
  }

  ngOnDestroy(): void {
       this.apiUrl = null;
  }

  getAll(): Observable<Array<PriorityType>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('authorization', 'Bearer ' + this.apiToken);
    return this.http.get<Array<PriorityType>>(this.apiUrl, { headers: headers })
    .pipe(map((response: Array<PriorityType>) => {
      return response;
    }), catchError(this.handleError));
  }
}
