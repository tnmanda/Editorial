import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../helpers/app-error-handler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Country } from '../models/country.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';
  public apiToken: string;

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
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('authorization', 'Bearer ' + this.apiToken);

    return this.http.get<Array<Country>>(this.apiUrl, { headers: headers })
    .pipe(map((response: Array<Country>) => {
      return response;
    }), catchError(this.handleError));
  }
}
