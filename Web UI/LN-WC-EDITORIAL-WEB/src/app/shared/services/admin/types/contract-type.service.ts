import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ContractType } from '../../../models/admin/types/contract-type.model';

@Injectable({
  providedIn: 'root'
})
export class ContractTypeService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<ContractType>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<ContractType>>(this.apiUrl)
    .pipe(map((response: Array<ContractType>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<ContractType> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<ContractType>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as ContractType)), catchError(this.handleError));
  }

  post(item: ContractType): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: ContractType): Observable<ContractType> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: ContractType) => {
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
