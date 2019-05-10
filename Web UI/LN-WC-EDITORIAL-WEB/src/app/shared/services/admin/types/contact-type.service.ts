import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ContactType } from '../../../models/admin/types/contact-type.model';

@Injectable({
  providedIn: 'root'
})
export class ContactTypeService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<ContactType>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<ContactType>>(this.apiUrl)
    .pipe(map((response: Array<ContactType>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<ContactType> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<ContactType>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as ContactType)), catchError(this.handleError));
  }

  post(item: ContactType): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: ContactType): Observable<ContactType> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: ContactType) => {
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
