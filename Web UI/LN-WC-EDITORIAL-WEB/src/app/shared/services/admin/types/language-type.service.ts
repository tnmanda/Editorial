import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../../helpers/app-error-handler';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LanguageType } from '../../../models/admin/types/language-type.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LanguageTypeService extends AppErrorHandler implements OnDestroy  {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<LanguageType>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<LanguageType>>(this.apiUrl)
    .pipe(map((response: Array<LanguageType>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<LanguageType> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<LanguageType>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as LanguageType)), catchError(this.handleError));
  }

  post(item: LanguageType): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: LanguageType): Observable<LanguageType> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: LanguageType) => {
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
