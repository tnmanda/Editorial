import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../helpers/app-error-handler';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { InvestigationEntityNav, InvestigationEntityData } from '../../models/investigation/investigation-entity-nav.model';
import { InvestigationEntity, InvEntityHRToken, InvEntityObject } from '../../models/investigation/investigation-entity.model';

@Injectable({
  providedIn: 'root'
})
export class InvestigationService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  constructor(private http: HttpClient) {
    super();
  }

  getNavs(id: number): Observable<Array<InvestigationEntityNav>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<InvestigationEntityNav>>(`${this.apiUrl}${id}`)
    .pipe(map((response: Array<InvestigationEntityNav>) => {
      return response;
    }), catchError(this.handleError));
  }

  getInvestigationEntities(item: InvestigationEntityData): Observable<Array<InvestigationEntity>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.post(this.apiUrl, item)
    .pipe(map((response: Array<InvestigationEntity>) => {
      return response;
    }), catchError(this.handleError));
  }

  getBwqEntityObject(item: InvEntityHRToken) {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: InvEntityObject) => {
      return response;
    }), catchError(this.handleError));
  }

  ngOnDestroy(): void {
    this.apiUrl = null;
  }
}
