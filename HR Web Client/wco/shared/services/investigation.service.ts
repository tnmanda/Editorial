import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../helpers/app-error-handler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { InvestigationEntityObject } from '../models/investigation-entity-object.model';
import { catchError, map } from 'rxjs/operators';
import { InvestigationPostData } from '../models/investigation.model';
import { InvestigationEmail } from '../models/investigation-email.model';
import { RecordLock } from '../models/record-lock.model';

@Injectable({
  providedIn: 'root'
})
export class InvestigationService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';
  public apiToken: string;

  constructor(private http: HttpClient) {
    super();

  }

  getInvestigationEntityObject(id: string): Observable<InvestigationEntityObject> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('authorization', 'Bearer ' + this.apiToken);
    return this.http.get<InvestigationEntityObject>(`${this.apiUrl}${id}`, { headers: headers })
    .pipe(map((items => items as InvestigationEntityObject)), catchError(this.handleError));
  }

  put(item: InvestigationPostData): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('authorization', 'Bearer ' + this.apiToken);

    return this.http.put(this.apiUrl, item, { headers: headers })
    .pipe(map((response: any) => {
      console.log(response);
      return response;
    }), catchError(this.handleError));
  }

  postEmail(item: InvestigationEmail): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('authorization', 'Bearer ' + this.apiToken);

    return this.http.post(this.apiUrl, item, { headers: headers })
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  postLockEntity(item: RecordLock): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('authorization', 'Bearer ' + this.apiToken);

    return this.http.post(this.apiUrl, item, { headers: headers })
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  deleteUnlockEntity(item: RecordLock): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + this.apiToken
      }),
      body: item,
    };
    console.log(options);
    return this.http.delete(this.apiUrl, options)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  ngOnDestroy(): void {
    this.apiUrl = null;
  }

}
