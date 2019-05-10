import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Country } from '../../models/admin/country.model';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
       this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<Country>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<Country>>(this.apiUrl)
    .pipe(map((response: Array<Country>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<Country> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Country>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as Country)), catchError(this.handleError));
  }

  post(item: Country): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: Country): Observable<Country> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: Country) => {
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
