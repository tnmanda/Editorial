import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../helpers/app-error-handler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Bwq } from '../../models/bwq/bwq.model';
import { BwqEntityNav, BwqEntityData } from '../../models/bwq/bwq-entity-nav.model';
import { BwqEntity, BwqEntityHRToken, BwqEntityObject } from '../../models/bwq/bwq-entity.model';
import { RecordLock } from '../../models/bwq/record-lock.model';

@Injectable({
  providedIn: 'root'
})
export class BwqService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
       this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<Bwq>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<Bwq>>(this.apiUrl)
    .pipe(map((response: Array<Bwq>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<Bwq> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Bwq>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as Bwq)), catchError(this.handleError));
  }

  post(item: Bwq): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: Bwq): Observable<Bwq> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: Bwq) => {
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

  getNavs(id: number): Observable<Array<BwqEntityNav>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<BwqEntityNav>>(`${this.apiUrl}${id}`)
    .pipe(map((response: Array<BwqEntityNav>) => {
      return response;
    }), catchError(this.handleError));
  }

  getBwqEntities(item: BwqEntityData): Observable<Array<BwqEntity>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.post(this.apiUrl, item)
    .pipe(map((response: Array<BwqEntity>) => {
      return response;
    }), catchError(this.handleError));
  }

  getBwqEntityObject(item: BwqEntityHRToken) {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: BwqEntityObject) => {
      return response;
    }), catchError(this.handleError));
  }

  postLockEntity(item: RecordLock): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  deleteUnlockEntity(item: RecordLock): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: item,
    };
    console.log(options);
    return this.http.delete(this.apiUrl, options)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }
}
