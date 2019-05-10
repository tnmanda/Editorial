import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Collection } from '../../models/bwq/collection.model';

@Injectable({
  providedIn: 'root'
})
export class CollectionService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
       this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<Collection>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<Collection>>(this.apiUrl)
    .pipe(map((response: Array<Collection>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<Collection> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Collection>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as Collection)), catchError(this.handleError));
  }

  post(item: Collection): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: Collection): Observable<Collection> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: Collection) => {
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
