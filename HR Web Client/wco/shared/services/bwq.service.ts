import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../helpers/app-error-handler';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { BwqEntityObject } from '../models/bwq-entity-object.model';

@Injectable({
  providedIn: 'root'
})
export class BwqService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';
  public apiToken: string;

  constructor(private http: HttpClient) {
    super();

  }

  ngOnDestroy(): void {
       this.apiUrl = null;
  }

  getBwqEntityObject(id: string): Observable<BwqEntityObject> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('authorization', 'Bearer ' + this.apiToken);
    return this.http.get<BwqEntityObject>(`${this.apiUrl}${id}`, { headers: headers })
    .pipe(map((items => items as BwqEntityObject)), catchError(this.handleError));
  }
}
