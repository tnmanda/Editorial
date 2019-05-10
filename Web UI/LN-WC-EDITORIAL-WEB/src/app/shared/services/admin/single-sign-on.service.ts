import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { SingleSignOn } from '../../models/admin/single-sign-on.model';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SingleSignOnService extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
       this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getSingleSignOn(): Observable<SingleSignOn> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<SingleSignOn>(`${this.apiUrl}`)
    .pipe(map((response: SingleSignOn) => {
      return response;
    }), catchError(this.handleError));
  }

}
