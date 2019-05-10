import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CollectionItem } from '../../models/bwq/collection-item.model';

@Injectable({
  providedIn: 'root'
})
export class CollectionItemService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
       this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<CollectionItem>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<CollectionItem>>(this.apiUrl)
    .pipe(map((response: Array<CollectionItem>) => {
      return response;
    }), catchError(this.handleError));
  }

  getByCollectionID(id: string): Observable<Array<CollectionItem>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<CollectionItem>>(`${this.apiUrl}${id}`)
    .pipe(map((response: Array<CollectionItem>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<CollectionItem> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<CollectionItem>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as CollectionItem)), catchError(this.handleError));
  }

  post(item: CollectionItem): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: CollectionItem): Observable<CollectionItem> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: CollectionItem) => {
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
