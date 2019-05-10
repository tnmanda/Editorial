import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProficiencyType } from '../../../models/admin/types/proficiency-type.model';

@Injectable({
  providedIn: 'root'
})
export class ProficiencyTypeService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<ProficiencyType>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<ProficiencyType>>(this.apiUrl)
    .pipe(map((response: Array<ProficiencyType>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<ProficiencyType> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<ProficiencyType>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as ProficiencyType)), catchError(this.handleError));
  }

  post(item: ProficiencyType): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: ProficiencyType): Observable<ProficiencyType> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: ProficiencyType) => {
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
