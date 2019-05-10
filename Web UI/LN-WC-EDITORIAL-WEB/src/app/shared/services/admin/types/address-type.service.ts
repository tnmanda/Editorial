import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { AddressType } from '../../../models/admin/types/address-type.model';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddressTypeService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<AddressType>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<AddressType>>(this.apiUrl)
    .pipe(map((response: Array<AddressType>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<AddressType> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<AddressType>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as AddressType)), catchError(this.handleError));
  }

  post(item: AddressType): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: AddressType): Observable<AddressType> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: AddressType) => {
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
