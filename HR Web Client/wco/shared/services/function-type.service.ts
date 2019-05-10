import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../helpers/app-error-handler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FunctionType } from '../models/function-type.model';

@Injectable({
  providedIn: 'root'
})
export class FunctionTypeService extends AppErrorHandler implements OnDestroy  {

  public apiUrl: string;
  private error = 'api url endpoint not set!';
  public apiToken: string;

  ngOnDestroy(): void {
       this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<FunctionType>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('authorization', 'Bearer ' + this.apiToken);

    return this.http.get<Array<FunctionType>>(this.apiUrl, { headers: headers })
    .pipe(map((response: Array<FunctionType>) => {
      return response;
    }), catchError(this.handleError));
  }
}
