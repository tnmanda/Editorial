import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export class AppErrorHandler {
  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      return throwError(`An error occurred: ${error.error.message}`);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      let msgs = '';
      if (error.error && error.error.errorMessages) {
        error.error.errorMessages.forEach(element => {
          msgs += element;
        });
      }
      if (error.error) {
        Object.keys(error.error).map(e =>  msgs += `${e}: ${error.error[e]}`);
      }
      return throwError(`Status: ${error.status}, Message is: ${error.message} : ${msgs}`);
    }
  }
}
