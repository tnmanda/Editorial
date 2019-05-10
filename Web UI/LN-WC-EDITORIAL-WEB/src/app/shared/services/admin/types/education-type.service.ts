import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { EducationType } from '../../../models/admin/types/education-type.model';

@Injectable({
  providedIn: 'root'
})
export class EducationTypeService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<EducationType>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<EducationType>>(this.apiUrl)
    .pipe(map((response: Array<EducationType>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<EducationType> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<EducationType>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as EducationType)), catchError(this.handleError));
  }

  post(item: EducationType): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: EducationType): Observable<EducationType> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: EducationType) => {
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
