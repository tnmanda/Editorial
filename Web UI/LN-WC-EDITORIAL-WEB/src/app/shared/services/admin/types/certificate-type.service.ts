import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CertificateType } from '../../../models/admin/types/certificate-type.model';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CertificateTypeService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<CertificateType>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<CertificateType>>(this.apiUrl)
    .pipe(map((response: Array<CertificateType>) => {
      return response;
    }), catchError(this.handleError));
  }

  getSingle(id: string): Observable<CertificateType> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<CertificateType>(`${this.apiUrl}${id}`)
    .pipe(map((items => items as CertificateType)), catchError(this.handleError));
  }

  post(item: CertificateType): Observable<any> {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  put(item: CertificateType): Observable<CertificateType> {
    return this.http.put(this.apiUrl, item)
    .pipe(map((response: CertificateType) => {
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
