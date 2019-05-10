import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { EntityCategory } from '../../models/bwq/entity-category.model';
import { EntitySubCategory } from '../../models/bwq/entity-sub-category.model';
import { EntityLevel } from '../../models/bwq/entity-level.model';
import { EntitySource } from '../../models/bwq/entity-source.model';
import { EntityParam } from '../../models/bwq/entity-param.model';

@Injectable({
  providedIn: 'root'
})
export class EntityService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
       this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getCategories(): Observable<Array<EntityCategory>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<EntityCategory>>(this.apiUrl)
    .pipe(map((response: Array<EntityCategory>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSubCategories(): Observable<Array<EntitySubCategory>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<EntitySubCategory>>(this.apiUrl)
    .pipe(map((response: Array<EntitySubCategory>) => {
      return response;
    }), catchError(this.handleError));
  }

  getLevels(): Observable<Array<EntityLevel>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<EntityLevel>>(this.apiUrl)
    .pipe(map((response: Array<EntityLevel>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSources(): Observable<Array<EntitySource>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<EntitySource>>(this.apiUrl)
    .pipe(map((response: Array<EntitySource>) => {
      return response;
    }), catchError(this.handleError));
  }

  getEntities(item: EntityParam): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }
}
